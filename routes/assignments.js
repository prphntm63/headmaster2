const express = require('express');
const router = express.Router();
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./dev.sqlite3"
    }
});

router.get('/', (req, res) => {
    console.log('getting assignments')

    knex.select('*')
    .from('assignments')
    .then(assignments => {
        res.render('assignments', {assignments:assignments})
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

module.exports = router;