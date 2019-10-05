exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, cohort: 'Flex June 2019', startDate: '01-06-2019', graduated: false},
        {id: 2, cohort: 'Immersive August 2019', startDate: '01-08-2019', graduated: false},
        {id: 3, cohort: 'Flex October 2019', startDate: '01-10-2019', graduated: false},
      ]);
    });
};

// .createTable('cohorts', table => {
//   table.increments('id')
//   table.string('cohort')
//   table.date('startDate')
//   table.boolean('graduated')
// })