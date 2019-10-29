exports.seed = function(knex) {
  console.log('Seeding 002-Cohorts...')
  return knex('Cohorts').insert([
    {name: 'Flex June 2019', slug: 'F0619', startDate: '01-06-2019', archived: false},
    {name: 'Immersive August 2019', slug: 'I0819', startDate: '01-08-2019', archived: false},
    {name: 'Flex October 2019', slug: 'F1019', startDate: '01-10-2019', archived: false},
    {name: 'Immersive October 2019', slug: 'I1019', startDate: '01-10-2019', archived: false},  
  ]);
};

// .createTable('Cohorts', table => {
//   table.uuid('id').primary().defaultTo(knex.raw('CONCAT("cohort-", uuid_generate_v4())'))
//   table.timestamp('ctime').defaultTo(knex.fn.now())
//   table.timestamp('mtime').defaultTo(knex.fn.now())
//   // table.increments('id').primary();
//   table.string('name')
//   table.string('slug')
//   table.date('startDate')
//   table.boolean('graduated')
// })