const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db.js');
const github = require('./github.js');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const path = require('path')
const schedule = require('node-schedule')

const app = express()
const port = process.env.PORT || '5000';

// ***** Get and update each users' commits once a day at 3 AM *****
let fetchTime = 1*24*60*60*1000 // 1 day in milliseconds
var scheduleRule = new schedule.RecurrenceRule()
scheduleRule.hour = 3;
var job = schedule.scheduleJob(scheduleRule, function() {
    
    db.getAllStudentIdAndGithub()
    .then(studentIdAndGithub => {
        studentIdAndGithub.forEach(studentIds => {
            github.getUserCommits(studentIds.github, fetchTime)
            .then(commitsOutArray => {
                commitsOutArray.forEach(commit => {
                    commit.student = studentIds.id
                })

                db.addCommits(commitsOutArray)
                .then(() => {
                    console.log(`Commits updated for student ${studentIds.github}`)
                })
            })
            .catch(err => {
                console.log('error getting github data for student - ', err)
            })
        })
    })

    
})

passport.use(new GitHubStrategy(
    {
        clientID: 'f557b8f71bf0a32f69d4',
        clientSecret: 'e421378ff7af880612d7c11fd23778a6fbab90ed',
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    }, 
    db.authenticateUser
));

// ***** Serialize and deserialize users for Passport session *****

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    db.getUser(id)
    .then(user => {
        done(null, user)
    })
    .catch(err => {
        done(err)
    })
});

// ***** Setup Express / Passport sessions *****

app.use(session({ 
    secret: "cats",
    name : "headmaster2",
    proxy : true,
    resave : true,
    saveUninitialized : true
}));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// ***** Set template engine *****

app.set('view engine', 'pug')
app.set('views', './public/views')

// ***** Routes *****

// app.use('/public', express.static('public'));
app.use('/favicon.ico', (req, res) => {
    res.status(204)
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
})

let dashboard = require('./routes/dashboard')
let students = require('./routes/students')
let cohorts = require('./routes/cohorts')
let instructors = require('./routes/instructors')
let api = require('./routes/api')

// app.use('/dashboard', dashboard)
// app.use('/', cohorts)
// app.use('/students', students)
// app.use('/instructors', instructors)

app.use('/api', api)
// app.get('/api/test', (req, res) => {
//     res.status(200).json({"ok":"ok"})
// })

app.get('/auth/github',
    passport.authenticate('github'), function(req,res) {
        console.log('Attempting to authenticate w/ github')
    });

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        console.log('Authenticated with Github')
        // res.sendFile(path.join(__dirname+'/client/build/index.html'));
        // res.redirect('/');
        res.redirect("http://localhost:3000/");
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})