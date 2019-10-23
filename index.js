const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db.js');
const github = require('./github.js');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const app = express()
const port = process.env.PORT || '3000';

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

app.use('/public', express.static('public'));
app.use('/favicon.ico', (req, res) => {
    res.status(204)
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

let dashboard = require('./routes/dashboard')
let students = require('./routes/students')
let cohorts = require('./routes/cohorts')
let instructors = require('./routes/instructors')
let api = require('./routes/api')

app.use('/dashboard', dashboard)
app.use('/', cohorts)
app.use('/students', students)
app.use('/instructors', instructors)
app.use('/api', api)

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})