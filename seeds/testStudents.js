exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, firstName: 'Johanna', lastName: 'Merrill', github: 'https://github.com', cohort: '1'},
        {id: 2, firstName: 'Rheanna', lastName: 'Ellison', github: 'https://github.com', cohort: '1'},
        {id: 3, firstName: 'Aanya', lastName: 'Noble', github: 'https://github.com', cohort: '1'},
        {id: 4, firstName: 'Sheridan', lastName: 'Schaefer', github: 'https://github.com', cohort: '2'},
        {id: 5, firstName: 'Spencer', lastName: 'Mckenzie', github: 'https://github.com', cohort: '2'},
        {id: 6, firstName: 'Imogen', lastName: 'Frey', github: 'https://github.com', cohort: '2'},
        {id: 7, firstName: 'Franco', lastName: 'Ashley', github: 'https://github.com', cohort: '2'},
        {id: 8, firstName: 'Dania', lastName: 'Coffey', github: 'https://github.com', cohort: '3'},
        {id: 9, firstName: 'Shane', lastName: 'Horner', github: 'https://github.com', cohort: '3'},
        {id: 10, firstName: 'Walter', lastName: 'Dodson', github: 'https://github.com', cohort: '3'},
      ]);
    });
};

// .createTable('students', (table) => {
//   table.increments('id');
//   table.string('firstName', 255).notNullable();
//   table.string('lastName', 255).notNullable();
//   table.string('github', 255);
//   table.string('cohort', 255).notNullable();
// })