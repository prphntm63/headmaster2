const express = require('express');

const app = express()
const port = 3000;

app.set('view engine', 'pug')
app.set('views', './public/views')

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {title:"Headmaster2", message:"Hello World!"})
})

let assignments = require('./routes/assignments')
let students = require('./routes/students')
let cohorts = require('./routes/cohorts')

app.use('/assignments', assignments)
app.use('/cohorts', cohorts)
app.use('/students', students)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})