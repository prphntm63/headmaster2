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
                res.render('cohort', {
                    "instructors" : cohortInstructors,
                    "students" : cohortStudents,
                    "info" : cohortInfo[0],
                    "user" : req.user
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
        res.status(401).redirect('/')
    }
}

module.exports = router;