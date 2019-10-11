const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/', (req, res) => {
    console.log('getting cohorts')

    // knex
    // .from('cohorts')
    // .leftJoin('students', 'cohorts.id', '=', 'students.cohort')
    // .select('cohorts.id', 'cohorts.cohort', 'cohorts.startDate', 'cohorts.graduated', knex.raw('COUNT(students.cohort) as numStudents'))
    // .groupBy('cohorts.id', 'cohorts.cohort', 'cohorts.startDate', 'cohorts.graduated')
    db.getCohortList()
    .then(cohorts => {
        res.render('cohorts', {cohorts:cohorts})
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/:cohortId', (req, res) => {
    let cohortId = req.params.cohortId

    // knex
    // .from('cohorts')
    // .join('students', 'cohorts.id', '=', 'students.cohort')
    // .join('link_cohorts_assignments', 'cohorts.id', '=', 'link_cohorts_assignments.cohortId')
    // .select('*')
    // .where({'cohorts.id' : cohortId})
    db.getCohort(cohortId)
    .then(cohorts => {
        let cohort = cohorts[0];
        res.render('cohort', {cohort: cohort})
    })
    .catch(err => {
        console.log(err)
        res.status(404)
    })
})

router.post('/', (req,res) => {
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

module.exports = router;