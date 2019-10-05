exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('link_cohorts_assignments').insert([
        {cohort: '1', assignment: '1', dueDate: '01-07-2019'},
        {cohort: '1', assignment: '2', dueDate: '15-07-2019'},
        {cohort: '1', assignment: '3', dueDate: '01-08-2019'},
        {cohort: '1', assignment: '4', dueDate: '15-08-2019'},
        {cohort: '1', assignment: '5', dueDate: '01-09-2019'},
        {cohort: '1', assignment: '6', dueDate: '15-09-2019'},
        {cohort: '1', assignment: '7', dueDate: '01-10-2019'},
        {cohort: '2', assignment: '1', dueDate: '01-09-2019'},
        {cohort: '2', assignment: '2', dueDate: '08-09-2019'},
        {cohort: '2', assignment: '3', dueDate: '15-09-2019'},
        {cohort: '2', assignment: '4', dueDate: '22-09-2019'},
        {cohort: '2', assignment: '5', dueDate: '01-10-2019'},
        {cohort: '2', assignment: '6', dueDate: '08-10-2019'},
        {cohort: '2', assignment: '7', dueDate: '15-10-2019'},
        {cohort: '3', assignment: '1', dueDate: '01-11-2019'},
        {cohort: '3', assignment: '2', dueDate: '08-11-2019'},
        {cohort: '3', assignment: '3', dueDate: '15-11-2019'},
        {cohort: '3', assignment: '4', dueDate: '22-11-2019'},
        {cohort: '3', assignment: '5', dueDate: '01-12-2019'},
        {cohort: '3', assignment: '6', dueDate: '08-12-2019'},
        {cohort: '3', assignment: '7', dueDate: '15-12-2019'},
      ]);
    });
};

// .createTable('link_cohorts_assignments', (table) => {
//   table.string('assignment').references('id').inTable('assignments')
//   table.string('cohort').references('id').inTable('cohorts')
//   table.date('dueDate')
// })