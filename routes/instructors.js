const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/', ensureAuthenticated, (req, res) => {
    let userId = req.user.id

    db.getUsers(userId)
    .then(instructors => {
        res.render('instructors', {instructors:instructors, user:req.user})
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/:userGithub', ensureAuthenticated, (req,res) => {
    let userId = req.user.id
    let userGithub = req.params.userGithub

    db.getUserIdFromGithub(userGithub)
    .then(instructorId => {
        Promise.all([db.getUser(instructorId), db.getCohortsByUser(instructorId), db.getTouchpointsByUser(instructorId)])
        .then(([instructor, cohorts, touchpoints]) => {
            res.render('instructor',{
                "instructor" : instructor,
                "cohorts" : cohorts,
                "touchpoints" : touchpoints,
                "user" : req.user
            })
        })
        .catch(err => {
            console.log('error getting instructor data - ', err)
        })
    })
    .catch(err => {
        console.log('error getting instructor id from github - ', err)
    })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).redirect('/')
    }
}

module.exports = router;