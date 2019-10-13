const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());

app.set('view engine', 'pug')
app.set('views', './public/views')

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {title:"Headmaster2", message:"Hello World!"})
})

let dashboard = require('./routes/dashboard')
let students = require('./routes/students')
let cohorts = require('./routes/cohorts')
let api = require('./routes/api')

app.use('/dashboard', dashboard)
app.use('/cohorts', cohorts)
app.use('/students', students)
app.use('/api', api)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})