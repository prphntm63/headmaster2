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

router.get('/:cohortId', ensureAuthenticated, (req, res) => {
    let cohortId = req.params.cohortId

    Promise.all([
        db.getCohortInstructors(cohortId),
        db.getCohortStudentsAndStatus(cohortId),
        db.getCohortInfo(cohortId)
    ])
    .then(cohortData => {
        let cohortInstructors = cohortData[0]
        let cohortStudents = cohortData[1]
        let cohortInfo = cohortData[2]

        res.render('cohort', {
            "instructors" : cohortInstructors,
            "students" : cohortStudents,
            "info" : cohortInfo[0],
            "user" : req.user
        })
    })
    .catch(err => {
        console.log(err)
        res.status(404)
    })
})

router.post('/', ensureAuthenticated, (req,res) => {
    console.log('got post request to /cohorts')
    let cohortInfo = req.body
    let validationErrors = []

    for (key in studentInfo) {
        if (!cohortInfo[key]) {
            validationErrors.push({
                "field" : key,
                "error" : "Field value expected, none received"
            })
        }
    }

    if (validationErrors.length) {
        res.status(400).send(
            {"errors" : validationErrors}
        )
    } else {
        db.addStudent(studentInfo)
        .then(studentInfo => {
            console.log(studentInfo)
            res.status(200).send({"errors" : false})
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        })
    }
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).redirect('/')
    }
}

module.exports = router;