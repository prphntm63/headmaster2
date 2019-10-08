exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('link_cohorts_assignments').insert([
        {cohortId: '1', assignmentId: '1', dueDate: '01-07-2019'},
        {cohortId: '1', assignmentId: '2', dueDate: '15-07-2019'},
        {cohortId: '1', assignmentId: '3', dueDate: '01-08-2019'},
        {cohortId: '1', assignmentId: '4', dueDate: '15-08-2019'},
        {cohortId: '1', assignmentId: '5', dueDate: '01-09-2019'},
        {cohortId: '1', assignmentId: '6', dueDate: '15-09-2019'},
        {cohortId: '1', assignmentId: '7', dueDate: '01-10-2019'},
        {cohortId: '2', assignmentId: '1', dueDate: '01-09-2019'},
        {cohortId: '2', assignmentId: '2', dueDate: '08-09-2019'},
        {cohortId: '2', assignmentId: '3', dueDate: '15-09-2019'},
        {cohortId: '2', assignmentId: '4', dueDate: '22-09-2019'},
        {cohortId: '2', assignmentId: '5', dueDate: '01-10-2019'},
        {cohortId: '2', assignmentId: '6', dueDate: '08-10-2019'},
        {cohortId: '2', assignmentId: '7', dueDate: '15-10-2019'},
        {cohortId: '3', assignmentId: '1', dueDate: '01-11-2019'},
        {cohortId: '3', assignmentId: '2', dueDate: '08-11-2019'},
        {cohortId: '3', assignmentId: '3', dueDate: '15-11-2019'},
        {cohortId: '3', assignmentId: '4', dueDate: '22-11-2019'},
        {cohortId: '3', assignmentId: '5', dueDate: '01-12-2019'},
        {cohortId: '3', assignmentId: '6', dueDate: '08-12-2019'},
        {cohortId: '3', assignmentId: '7', dueDate: '15-12-2019'},
      ]);
    });
};

// .createTable('link_cohorts_assignmentIds', (table) => {
//   table.string('assignmentId').references('id').inTable('assignmentIds')
//   table.string('cohortId').references('id').inTable('cohorts')
//   table.date('dueDate')
// })