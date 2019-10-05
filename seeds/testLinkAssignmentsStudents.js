
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, firstName: 'Johanna', lastName: 'Merrill', github: 'https://github.com', cohort: '06-2019'},
        {id: 2, firstName: 'Rheanna', lastName: 'Ellison', github: 'https://github.com', cohort: '06-2019'},
        {id: 3, firstName: 'Aanya', lastName: 'Noble', github: 'https://github.com', cohort: '06-2019'},
        {id: 4, firstName: 'Sheridan', lastName: 'Schaefer', github: 'https://github.com', cohort: '08-2019'},
        {id: 5, firstName: 'Spencer', lastName: 'Mckenzie', github: 'https://github.com', cohort: '08-2019'},
        {id: 6, firstName: 'Imogen', lastName: 'Frey', github: 'https://github.com', cohort: '08-2019'},
        {id: 7, firstName: 'Franco', lastName: 'Ashley', github: 'https://github.com', cohort: '08-2019'},
        {id: 8, firstName: 'Dania', lastName: 'Coffey', github: 'https://github.com', cohort: '10-2019'},
        {id: 9, firstName: 'Shane', lastName: 'Horner', github: 'https://github.com', cohort: '10-2019'},
        {id: 10, firstName: 'Walter', lastName: 'Dodson', github: 'https://github.com', cohort: '10-2019'},
      ]);
    });
};

// .createTable('link_assignments_students', (table) => {
//   table.increments('id');
//   table.string('student').references('id').inTable('students');
//   // table.foreign('student')
//   table.string('assignment').references('id').inTable('assignments');
//   // table.foreign('assignment')
//   table.json('answers');
//   table.boolean('submitted');
//   table.integer('grade');
// })
