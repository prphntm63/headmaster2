exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(() => {
      return knex.table('cohorts')
      .pluck('id')
    }) 
    .then(cohortIds => {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, firstName: 'Johanna', lastName: 'Merrill', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 2, firstName: 'Rheanna', lastName: 'Ellison', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 3, firstName: 'Aanya', lastName: 'Noble', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 4, firstName: 'Sheridan', lastName: 'Schaefer', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 5, firstName: 'Spencer', lastName: 'Mckenzie', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 6, firstName: 'Imogen', lastName: 'Frey', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 7, firstName: 'Franco', lastName: 'Ashley', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 8, firstName: 'Dania', lastName: 'Coffey', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 9, firstName: 'Shane', lastName: 'Horner', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
        {id: 10, firstName: 'Walter', lastName: 'Dodson', github: 'https://github.com', cohort: getRandomCohortId(cohortIds)},
      ]);
    });
};

function getRandomCohortId(cohortIds) {
  return cohortIds[ Math.floor(Math.random() * cohortIds.length) ]
}

// .createTable('students', (table) => {
//   table.increments('id');
//   table.string('firstName', 255).notNullable();
//   table.string('lastName', 255).notNullable();
//   table.string('github', 255);
//   table.string('cohort', 255).notNullable();
// })