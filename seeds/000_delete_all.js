exports.seed = function(knex) {
  console.log('Seeding 000-Delete All')
  // Deletes ALL existing entries
  
  return knex.select('*').from('LinkCohortsUsers').del()
  .then(() => {return knex.select('*').from('LinkCohortsStudents').del()})
  .then(() => {return knex.select('*').from('Touchpoints').del()})
  .then(() => {return knex.select('*').from('Commits').del()})
  .then(() => {return knex.select('*').from('Users').del()})
  .then(() => {return knex.select('*').from('Students').del()})
  .then(() => {return knex.select('*').from('Cohorts').del()})
};

// .dropTable('LinkCohortsUsers')
// .dropTable('LinkCohortsStudents')
// .dropTable('Touchpoints')
// .dropTable('Commits')
// .dropTable('Users')
// .dropTable('Students')
// .dropTable('Cohorts')
