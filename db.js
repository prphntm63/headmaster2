const knex = require(dbConfigs.development)

let db = {

    // ***** STUDENT METHODS *****

    getStudentList : function() {
        return knex
        .from('students')
        .join('cohorts', 'students.cohort', '=', 'cohorts.id')
        .select('students.id as id', 'students.firstName', 'students.lastName', 'students.github', 'cohorts.cohort', 'cohorts.graduated')
    },

    getStudent : function(studentId) {
        return knex
        .from('students')
        .join('cohorts', 'students.cohort', '=', 'cohorts.id')
        .join('link_assignments_students', 'students.id', '=', 'link_assignments_students.studentId')
        .select('*')
        .where({'students.id' : studentId})
    },

    addStudent : function(studentParams) {
        return knex
        .returning('id', 'firstName', 'lastName')
        .insert(studentParams)
        .into('students')
    },

    updateStudent : function(studentId, studentParams) {
        return knex('students')
        .returning('id', 'firstName', 'lastName')
        .where('id', '=', studentId)
        .update(studentParams)
    },

    // ***** COHORT METHODS *****

    getCohortList : function() {
        return knex
        .from('cohorts')
        .leftJoin('students', 'cohorts.id', '=', 'students.cohort')
        .select('cohorts.id', 'cohorts.cohortName', 'cohorts.startDate', 'cohorts.graduated', knex.raw('COUNT(students.cohort) as numStudents'))
        .groupBy('cohorts.id', 'cohorts.cohortName', 'cohorts.startDate', 'cohorts.graduated')
    },

    getCohort : function(cohortId) {
        return knex
        .from('cohorts')
        .leftJoin('students', 'cohorts.id', '=', 'students.cohort')
        .leftJoin('link_cohorts_assignments', 'cohorts.id', '=', 'link_cohorts_assignments.cohortId')
        .select('cohorts.*', 'students.id as studentId', 'students.cohort as studentCohort', knex.raw('COUNT(students.cohort) as numStudents'))
        .where({'cohorts.id' : cohortId})
    },

    // ***** ASSIGNMENT METHODS *****

    getAssignmentsList : function() {
        return knex.select('*')
        .from('assignments')
    },

    getAssignment : function(assignmentId) {
        return knex
        .from('assignments')
        .join('link_assignments_students', 'assignments.id', '=', 'link_assignments_students.assignmentId')
        .join('link_cohorts_assignments', 'assignments.id', '=', 'link_cohorts_assignments.cohortId')
        .select('assignments.*', 'link_assignments_students.studentId as studentId', 'link_cohorts_assignments.cohortId as cohortId')
        .where({'assignments.id' : assignmentId})
    }

}

module.exports = db;