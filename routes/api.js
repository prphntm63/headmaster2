const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/cohorts', ensureAuthenticated, (req, res) => {
    let userId = req.user.id 
    
    db.getCohortsByUser(userId)
    .then(cohortListJson => {
        res.status(200).json(cohortListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/cohorts/:cohortId', ensureAuthenticated, (req, res) => {
    let cohortId = req.params.cohortId
    db.getCohort(cohortId)
    .then(cohortListJson => {
        res.status(200).json(cohortListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/students', ensureAuthenticated, (req, res) => {
    db.getStudentList()
    .then(studentListJson => {
        res.status(200).json(studentListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/students/:studentId', ensureAuthenticated, (req, res) => {
    let studentId = req.params.studentId
    let userId = req.user.id

    console.log(userId, studentId)

    db.getStudentByUser(userId, studentId)
    .then(studentListJson => {
        res.status(200).json(studentListJson[0])
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.post('/touchpoints', ensureAuthenticated, (req, res) => {
    let user = req.user.id 
    let touchpointData = req.body
    touchpointData.user = user

    db.addTouchpoint(touchpointData)
    .then(touchpointData => {
        res.status(200).json(touchpointData)
    })
    .catch(err => {
        res.status(500)
        console.log(err)
    })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401)
    }
}

module.exports = router;