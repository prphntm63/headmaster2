const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/', (req, res) => {
    console.log('getting students')

    // knex
    // .from('students')
    // .join('cohorts', 'students.cohort', '=', 'cohorts.id')
    // .select('students.id as id', 'students.firstName', 'students.lastName', 'students.github', 'cohorts.cohort', 'cohorts.graduated')
    db.getStudentList()
    .then(students => {
        res.render('students', {students:students})
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/:studentId', (req, res) => {
    let studentId = req.params.studentId

    // knex
    // .from('students')
    // .join('cohorts', 'students.cohort', '=', 'cohorts.id')
    // .join('link_assignments_students', 'students.id', '=', 'link_assignments_students.studentId')
    // .select('*')
    // .where({'students.id' : studentId})
    db.getStudent(studentId)
    .then(students => {
        let student = students[0];
        res.render('student', {student: student})
    })
    .catch(err => {
        console.log(err)
        res.status(404)
    })
})

router.post('/', (req,res) => {
    console.log('got post request to /students')
    let studentInfo = req.body
    let validationErrors = []

    for (key in studentInfo) {
        if (!studentInfo[key]) {
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