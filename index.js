const express = require('express')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./headmaster2.sqlite"
    }
})

const app = express()
const port = 3000;

app.set('view engine', 'pug')
app.set('views', './public/views')

app.get('/', (req, res) => {
    res.render('index', {title:"Headmaster2", message:"Hello World!"})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})