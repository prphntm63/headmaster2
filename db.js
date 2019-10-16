const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config)

let db = {
    // ***** USER METHODS *****
    getUser : function(userId) {
        return knex
        .from('Users')
        .select('*')
        .where('Users.id', '=', userId)
        .then(rows => {
            return rows[0]
        })
        .catch(err => {
            console.log('Error in db.getUser - ', err)
        })
    },

    createUser : function(userId) {

    },

    updateUser : function(userId, params) {

    },

    authenticateUser : function(accessToken, refreshToken, profile, cb) {

        knex
        .from('Users')
        .select('*')
        .where('Users.github', '=', profile.username)
        .then(rows => {
            if (!rows.length) return cb(null, false, {message : "User Not Registered"})

            let user = rows[0]

            return knex('Users')
            .where('id', '=', user.id)
            .update({
                "mtime" : new Date(),
                "accessToken" : accessToken,
                "refreshToken" : refreshToken,
            })
            .then(() => {
                return cb(null, user)
            })

        })
        .catch(err => {
            return cb(err)
        })
    },

    // ***** STUDENT METHODS *****

    getStudentListByUser : function(userId) {
        if (!userId) return null

        return knex
        .from('Users')
        .join('LinkCohortsUsers', 'Users.id', '=', 'LinkCohortsUsers.user')
        .join('Cohorts', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .join('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .leftOuterJoin('Touchpoints AS tp', knex.raw('(SELECT MAX(ctime) FROM "Touchpoints" WHERE "Touchpoints".student="Students".id)'), '=', "tp.ctime")
        .select('Students.*', 'Cohorts.*', 'tp.*')
        .where({'LinkCohortsUsers.user' : userId})
    },

    getStudentByUser : function(userId, studentId) {
        if (!userId || !studentId) return null
        console.log(studentId)

        return knex
        .from('Students')
        .join('LinkCohortsStudents', 'Students.id', '=', 'LinkCohortsStudents.student')
        .join('Cohorts', 'LinkCohortsStudents.cohort', '=', 'Cohorts.id')
        .join('LinkCohortsUsers', 'Cohorts.id', '=', 'LinkCohortsUsers.cohort')
        .select('*')
        .where({
            'Students.id' : studentId,
            // 'LinkCohortsUsers.user' : userId
        })

        return knex
        .from('LinkCohortsUsers')
        .join('Cohorts', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .join('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .join('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .select('Cohorts.*', 'Students.*', 'LinkCohortsUsers.user as user')
        .where({
            'LinkCohortsStudents.student' : studentId,
            // 'LinkCohortsUsers.user' : userId
        })
        
    },

    // getStudentList : function() {
    //     return knex
    //     .from('students')
    //     .join('cohorts', 'students.cohort', '=', 'cohorts.id')
    //     .select('students.id as id', 'students.firstName', 'students.lastName', 'students.github', 'cohorts.cohort', 'cohorts.graduated')
    // },

    // getStudent : function(studentId) {
    //     return knex
    //     .from('students')
    //     .join('cohorts', 'students.cohort', '=', 'cohorts.id')
    //     .join('link_assignments_students', 'students.id', '=', 'link_assignments_students.studentId')
    //     .select('*')
    //     .where({'students.id' : studentId})
    // },

    // addStudent : function(studentParams) {
    //     return knex
    //     .returning('id', 'firstName', 'lastName')
    //     .insert(studentParams)
    //     .into('students')
    // },

    // updateStudent : function(studentId, studentParams) {
    //     return knex('students')
    //     .returning('id', 'firstName', 'lastName')
    //     .where('id', '=', studentId)
    //     .update(studentParams)
    // },

    // ***** COHORT METHODS *****

    getCohortsByUser : function(userId) {
        return knex
        .from('Users')
        .join('LinkCohortsUsers', 'Users.id', '=', 'LinkCohortsUsers.user')
        .join('Cohorts', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .join('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        // .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .select('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.graduated', knex.raw('COUNT("LinkCohortsStudents".cohort) as "numStudents"'))
        .groupBy('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.graduated')
        .where({'LinkCohortsUsers.user' : userId})
    },

    getCohortsList : function() {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        // .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .select('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.graduated', knex.raw('COUNT("LinkCohortsStudents".cohort) as "numStudents"'))
        .groupBy('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.graduated')
    },

    getCohortStudents : function(cohortId) {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .where({'Cohorts.id' : cohortId})
    },

    getCohortStudentsAndStatus : function(cohortId) {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        // .innerJoin('Touchpoints', 'Students.id', '=', 'Touchpoints.student')
        .leftOuterJoin('Touchpoints AS tp', knex.raw('(SELECT MAX(ctime) FROM "Touchpoints" WHERE "Touchpoints".student="Students".id)'), '=', "tp.ctime")
        .select('Students.id as studentId', 'tp.id as touchpointId', 'Students.*', 'tp.*')
        .groupBy('Students.id', 'tp.id')
        .where({'Cohorts.id' : cohortId})
    },

    getCohortInstructors : function(cohortId) {
        return knex
        .from('Cohorts')
        .join('LinkCohortsUsers', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .join('Users', 'LinkCohortsUsers.user', '=', 'Users.id')
        .select('Users.*', 'LinkCohortsUsers.role')
        .where({'Cohorts.id' : cohortId})
    },

    getCohortInfo : function(cohortId) {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .select('Cohorts.id', 'Cohorts.*', knex.raw('COUNT("LinkCohortsStudents".cohort) as "numStudents"'))
        .groupBy('Cohorts.id')
        .where({'Cohorts.id' : cohortId})
    },

    // // ***** ASSIGNMENT METHODS *****

    // getAssignmentsList : function() {
    //     return knex.select('*')
    //     .from('assignments')
    // },

    // getAssignment : function(assignmentId) {
    //     return knex
    //     .from('assignments')
    //     .join('link_assignments_students', 'assignments.id', '=', 'link_assignments_students.assignmentId')
    //     .join('link_cohorts_assignments', 'assignments.id', '=', 'link_cohorts_assignments.cohortId')
    //     .select('assignments.*', 'link_assignments_students.studentId as studentId', 'link_cohorts_assignments.cohortId as cohortId')
    //     .where({'assignments.id' : assignmentId})
    // }

}

module.exports = db;