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
    })
})

module.exports = router;