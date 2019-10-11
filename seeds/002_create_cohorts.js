exports.seed = function(knex) {
  console.log('Seeding 002-Cohorts...')
  return knex('cohorts').insert([
    {cohortName: 'Flex June 2019', startDate: '01-06-2019', graduated: false},
    {cohortName: 'Immersive August 2019', startDate: '01-08-2019', graduated: false},
    {cohortName: 'Flex October 2019', startDate: '01-10-2019', graduated: false},
  ]);
};

// .createTable('cohorts', table => {
//   table.increments('id')
//   table.string('cohort')
//   table.date('startDate')
//   table.boolean('graduated')
// })