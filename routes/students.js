const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/', ensureAuthenticated, (req, res) => {
    let userId = req.user.id

    db.getStudentListByUser(userId)
    .then(students => {
        res.render('students', {students:students, user:req.user})
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/:studentGithub', ensureAuthenticated, (req, res) => {
    let userId = req.user.id
    let studentGithub = req.params.studentGithub

    db.getStudentIdByGithub(studentGithub)
    .then(studentId => {
        db.getStudentByUser(userId, studentId)
        .then(students => {
            let student = students[0];
            res.render('student', {student: student, user:req.user})
        })
        .catch(err => {
            console.log(err)
            res.status(404)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(404)
    })

    
})

router.post('/', ensureAuthenticated, (req,res) => {
    console.log('got post request to /students')
    let studentInfo = req.body
    let validationErrors = []

    // Do validation and push errors into validationErrors array
    for (key in studentInfo) {
        if (!studentInfo[key]) {
            validationErrors.push({
                "field" : key,
                "error" : "Field value expected, none received"
            })
            
        }
    }

    // If there is errors, return a 400 status with error object
    if (validationErrors.length) {
        res.status(400).send(
            {"errors" : validationErrors}
        )
    // Else, return 200 status with no errors 
    } else {
        db.addStudent(studentInfo)
        .then(studentInfo => {
            console.log(studentInfo)
            // Feel free to redirect instead of sending 'no errors'
            res.status(200).send({"errors" : false})
        })
    // If database error, return 500 status
        .catch(err => {
            console.log(err)
            res.status(500)
        })
    }
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).redirect('/')
    }
}

module.exports = router;