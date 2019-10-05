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

    knex.select('*')
    .from('cohorts')
    .then(cohorts => {
        res.render('cohorts', {cohorts:cohorts})
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;