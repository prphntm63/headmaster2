const express = require('express');
const router = express.Router();
const db = require('./../db.js');
const github = require('./../github.js');

router.get('/test', (req, res) => {
    console.log('got API test request')
    res.status(200).json({"success" : true})
})

router.get('/usercohorts', ensureAuthenticated, (req, res) => {
    let user = req.user

    db.getAllDataByUser(user.id, user.superuser)
    .then(cohortDataJson => {
        let sendData = {
            user : req.user,
            cohorts : cohortDataJson
        }

        res.status(200).json(sendData)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/cohorts', ensureAuthenticated, (req, res) => {
    let user = req.user

    if (user.superadmin === "superadmin") {
        db.getCohortsList()
        .then(cohortListJson => {
            res.status(200).json(cohortListJson)
        })
        .catch(err => {
            console.log(err)
            res.status(500)
    })
    } else {
        db.getCohortsByUser(user.id)
        .then(cohortListJson => {
            res.status(200).json(cohortListJson)
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        })
    }
})

router.get('/cohorts/:cohortId', ensureAuthenticated, (req, res) => {
    let cohortId = req.params.cohortId
    db.getCohort(cohortId)
    .then(cohortListJson => {
        res.status(200).json(cohortListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.post('/cohorts', ensureAuthenticated, (req,res) => {
    let cohortInfo = req.body
    let validationErrors = []
    let user = req.user.id

    if (user.superuser !== 'superadmin' && user.superuser !== 'admin') {
        res.status(401).json({"errors" : "User permission not sufficent"})
    }

    // for (key in cohortInfo) {
    //     if (!cohortInfo[key]) {
    //         validationErrors.push({
    //             "field" : key,
    //             "error" : "Field value expected, none received"
    //         })
    //     }
    // }

    if (validationErrors.length) {
        res.status(400).send(
            {"errors" : validationErrors}
        )
    } else {
        let params = {
            "name" : cohortInfo.name,
            "startDate" : new Date(cohortInfo.startDate),
            "slug" : cohortInfo.slug,
            "archived" : cohortInfo.graduated,
            "user" : user
        }

        db.addCohort(params)
        .then(cohortInfo => {
            res.status(200).json(cohortInfo)
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        })
    }
})

router.post('cohorts/:cohortId', ensureAuthenticated, (req,res) => {
    
})

router.get('/github/:githubId', ensureAuthenticated, (req,res) => {
    let githubId = req.params.githubId

    Promise.all([db.getStudentIdByGithub(githubId), db.getUserIdFromGithub(githubId)])
    .then(([studentId, userId]) => {
        if (userId) {
            res.status(200).json({
                "type" : "user",
                "id" : userId
            })
        } else if (studentId) {
            res.status(200).json({
                "type" : "student",
                "id" : studentId
            })

        } else {
            res.status(200).json(null)
        }
    })
    .catch(err => {
        console.log('error getting github id from db - ', err)
        res.status(500)
    })
})

router.get('/students', ensureAuthenticated, (req, res) => {
    db.getStudentList()
    .then(studentListJson => {
        res.status(200).json(studentListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/students/:studentId', ensureAuthenticated, (req, res) => {
    let studentId = req.params.studentId
    let userId = req.user.id

    db.getStudentByUser(userId, studentId)
    .then(studentListJson => {
        console.log(studentListJson[0])
        res.status(200).json(studentListJson[0])
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.post('/students', ensureAuthenticated, (req, res) => {
    let userId = req.user.id;
    let studentParams = req.body;

    // Add validation methods

    db.addStudent(studentParams)
    .then(studentData => {
        // Add method to ensure user is allowed to create students

        // Get github commit history for new student
        let fetchTime = 90*24*60*60*1000 //milliseconds
        github.getUserCommits(studentData.github, fetchTime)
        .then(commitsOutArray => {
            commitsOutArray.forEach(commit => {
                commit.student = studentData.id
            })

            db.addCommits(commitsOutArray)
            .then(commitsAdded => {
                if (commitsAdded.length) {
                    studentData.commits = commitsAdded
                }
                res.status(200).json(studentData)
            })
        })
        .catch(err => {
            console.log('error getting github data for student - ', err)
        })
    })
    .catch(err => {
        res.status(500)
        console.log(err)
    })
})

router.post('/students/:studentId', ensureAuthenticated, (req, res) => {
    let studentId = req.params.studentId
    let userId = req.user.id
    let studentParams = req.body

    // Add validation methods

    db.updateStudent(studentId, studentParams)
    .then(updatedStudentInfo => {
        if (studentParams.github != updatedStudentInfo.github) {
            // Update commit history if github username changed

        }
        res.status(200).json(updatedStudentInfo)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.post('/touchpoints', ensureAuthenticated, (req, res) => {
    let user = req.user.id 
    let touchpointData = req.body
    touchpointData.user = user

    // Add validation methods

    db.addTouchpoint(touchpointData)
    .then(touchpointData => {
        // Add method to ensure user is instructor for cohort
        res.status(200).json(touchpointData)
    })
    .catch(err => {
        res.status(500)
        console.log(err)
    })
})

router.get('/instructors', ensureAuthenticated, (req,res) => {
    db.getUserList()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500)
        console.log(err)
    })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({"error" : "not authenticated"})
    }
}

module.exports = router;