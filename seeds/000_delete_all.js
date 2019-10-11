const deleteAllQuery = `
  BEGIN;
  DELETE FROM students;
  DELETE FROM assignments;
  DELETE FROM cohorts;
  DELETE FROM link_assignments_students;
  DELETE FROM link_cohorts_assignments;
  DELETE FROM instructors;
  DELETE FROM link_cohorts_instructors;
`

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw(deleteAllQuery)

};
