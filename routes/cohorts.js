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

router.get('/:cohortId', (req, res) => {
    let cohortId = req.params.cohortId

    knex
    .from('cohorts')
    .join('students', 'cohorts.id', '=', 'students.cohort')
    .join('link_cohorts_assignments', 'cohorts.id', '=', 'link_cohorts_assignments.cohortId')
    .select('*')
    .where({'cohorts.id' : cohortId})
    .then(cohorts => {
        let cohort = cohorts[0];
        res.render('cohort', {cohort: cohort})
    })
    .catch(err => {
        console.log(err)
        res.status(404)
    })
})

module.exports = router;