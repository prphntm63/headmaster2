const express = require('express');
const router = express.Router();
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./dev.sqlite3"
    }
});

router.get('/', (req, res) => {
    console.log('getting students')

    knex.select('*')
    .from('students')
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

    knex.select('*')
    .from('students')
    .where({id : studentId})
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