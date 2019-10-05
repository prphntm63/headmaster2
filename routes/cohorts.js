const express = require('express');
const router = express.Router();
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./dev.sqlite3"
    }
});

router.get('/', (req, res) => {
    console.log('getting cohorts')

    knex
    .from('cohorts')
    .leftJoin('students', 'cohorts.id', '=', 'students.cohort')
    .select('cohorts.id', 'cohorts.cohort', 'cohorts.startDate', 'cohorts.graduated', knex.raw('COUNT(students.cohort) as numStudents'))
    .groupBy('cohorts.id', 'cohorts.cohort', 'cohorts.startDate', 'cohorts.graduated')
    .then(cohorts => {
        res.render('cohorts', {cohorts:cohorts})
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

// router.get('/', (req, res) => {
//     console.log('getting students')

//     knex
//     .from('students')
//     .join('cohorts', 'students.cohort', '=', 'cohorts.id')
//     .select('*')
//     .then(students => {
//         res.render('students', {students:students})
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500)
//     })
// })

router.get('/:studentId', (req, res) => {
    let studentId = req.params.studentId

    knex
    .from('students')
    .join('cohorts', 'students.cohort', '=', 'cohorts.id')
    .join('link_assignments_students', 'students.id', '=', 'link_assignments_students.student')
    .select('*')
    .where({'students.id' : studentId})
    .then(students => {
        let student = students[0];
        res.render('student', {student: student})
    })
    .catch(err => {
        console.log(err)
        res.status(404)
    })
})

module.exports = router;