// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: "./dev.sqlite3"
//     }
// });

class db {
    constructor(knexInitializor) {
        this.knex = knex
    }

    getStudentList() {
        return knex
        .from('students')
        .join('cohorts', 'students.cohort', '=', 'cohorts.id')
        .select('students.id as id', 'students.firstName', 'students.lastName', 'students.github', 'cohorts.cohort', 'cohorts.graduated')
    }

    getStudent(studentId) {
        return knex
        .from('students')
        .join('cohorts', 'students.cohort', '=', 'cohorts.id')
        .join('link_assignments_students', 'students.id', '=', 'link_assignments_students.studentId')
        .select('*')
        .where({'students.id' : studentId})
    }

    getCohortList() {
        return knex
        .from('cohorts')
        .leftJoin('students', 'cohorts.id', '=', 'students.cohort')
        .select('cohorts.id', 'cohorts.cohort', 'cohorts.startDate', 'cohorts.graduated', knex.raw('COUNT(students.cohort) as numStudents'))
        .groupBy('cohorts.id', 'cohorts.cohort', 'cohorts.startDate', 'cohorts.graduated')
    }

    getCohort(cohortId) {
        return knex
        .from('cohorts')
        .join('students', 'cohorts.id', '=', 'students.cohort')
        .join('link_cohorts_assignments', 'cohorts.id', '=', 'link_cohorts_assignments.cohortId')
        .select('*')
        .where({'cohorts.id' : cohortId})
    }

    getAssignmentsList() {
        return knex.select('*')
        .from('assignments')
    }

    getAssignment(assignmentId) {
        return knex
        .from('assignments')
        .join('link_assignments_students', 'assignments.id', '=', 'link_assignments_students.assignmentId')
        .join('link_cohorts_assignments', 'assignments.id', '=', 'link_cohorts_assignments.cohortId')
        .select('assignments.*', 'link_assignments_students.studentId as studentId', 'link_cohorts_assignments.cohortId as cohortId')
        .where({'assignments.id' : assignmentId})
    }

    
}

module.exports = db;