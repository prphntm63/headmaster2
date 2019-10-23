const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/', ensureAuthenticated, (req, res) => {
    let userId = req.user.id

    db.getCohortsByUser(userId)
    .then(cohorts => {
        res.render('cohorts', {
            cohorts:cohorts,
            "user" : req.user
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/:cohortSlug', ensureAuthenticated, (req, res) => {
    let cohortSlug = req.params.cohortSlug
    let userId = req.user.id

    db.getCohortIdFromSlug(cohortSlug) //Convert URL slug to cohortId
    .then(cohortId => {
        Promise.all([
            db.getCohortInstructors(cohortId),
            db.getCohortStudentsAndStatus(cohortId),
            db.getCohortInfo(cohortId)
        ])
        .then(cohortData => {
            let cohortInstructors = cohortData[0]
            let cohortStudents = cohortData[1]
            let cohortInfo = cohortData[2]

            // Make sure user is cohort instructor to view
            if (!cohortInstructors.find((instructor => {
                return instructor.id === userId
            }))) {
                res.status(401).redirect('/')
            } else {
                // Attach commits to each student
                let commitPromises = []
                cohortStudents.forEach(student => {
                    commitPromises.push(db.getStudentCommits(student.studentId))
                })

                Promise.all(commitPromises)
                .then(commitsArray => {
                    commitsArray.forEach(studentCommits => {
                        if (studentCommits.length) {
                            let studentId = studentCommits[0].studentId

                            cohortStudents.forEach(student => {
                                if (studentId === student.studentId) {
                                    student.commits = parseCommits(studentCommits)
                                }
                            })
                        }
                    })
                    return cohortStudents
                })
                .then(cohortStudents => {
                    res.render('cohort', {
                        "instructors" : cohortInstructors,
                        "students" : cohortStudents,
                        "info" : cohortInfo[0],
                        "user" : req.user
                    })
                })
                .catch(err => {
                    console.log('error getting student commits - ', err)
                })   
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(404)
    })
    
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render('index')
    }
}

// Make commits array more front-end friendly
function parseCommits(commits) {
    let today = new Date()
    let dayOfWeek = today.getDay()
    let commitsArray = []

    // Show 4 weeks max
    for (let idx=(22+dayOfWeek); idx>0; idx--) {
        let offset = 24*60*60*1000
        let dayObject = {
            commits : [],
            repos : [],
            date : null,
            total : null,
            add : null,
            sub : null
        }

        commits.forEach(commit => {
            if ((commit.ctime.getTime() < today.getTime() - (idx*offset) + (offset/2) ) && (commit.ctime.getTime() > today.getTime() - (idx*offset) - (offset/2) )) {
                
                dayObject.commits.push(commit)
                dayObject.repos.push(commit.repo)
                dayObject.date = commit.ctime.getDate()
                dayObject.total += commit.total
                dayObject.add += commit.added
                dayObject.sub += commit.deleted
            }
        })
        commitsArray.push(dayObject)
    }

    return commitsArray
}

module.exports = router;