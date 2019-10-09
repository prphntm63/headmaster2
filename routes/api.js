const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/cohorts', (req, res) => {
    db.getCohortList()
    .then(cohortListJson => {
        res.status(200).json(cohortListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/cohorts/:cohortId', (req, res) => {
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

router.get('/students', (req, res) => {
    db.getStudentList()
    .then(studentListJson => {
        res.status(200).json(studentListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/students/:studentId', (req, res) => {
    let studentId = req.params.studentId
    db.getStudent(studentId)
    .then(studentListJson => {
        res.status(200).json(studentListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/assignments', (req, res) => {
    db.getAssignmentsList()
    .then(assignmentListJson => {
        res.status(200).json(assignmentListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

router.get('/assignments/:assignmentId', (req, res) => {
    let assignmentId = req.params.assignmentId
    db.getAssignment(assignmentId)
    .then(assignmentListJson => {
        res.status(200).json(assignmentListJson)
    })
    .catch(err => {
        console.log(err)
        res.status(500)
    })
})

module.exports = router;