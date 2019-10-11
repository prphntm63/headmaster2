const deleteAllQuery = `
  BEGIN;
  DELETE FROM link_assignments_students;
  DELETE FROM link_cohorts_assignments;
  DELETE FROM link_cohorts_instructors;
  DELETE FROM students;
  DELETE FROM assignments;
  DELETE FROM instructors;
  DELETE FROM cohorts;
  
  
`

exports.seed = function(knex) {
  console.log('Seeding 000-Delete All')
  // Deletes ALL existing entries
  return knex.raw(deleteAllQuery)

};
