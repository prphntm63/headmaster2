
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, title: 'JavaScript 101', instructions: 'Complete the exercises in the JS101 repository', 
          source: 'https://github.com'},
        {id: 2, title: 'JavaScript 102', instructions: 'Complete the exercises in the JS201 repository', 
          source: 'https://github.com'},
        {id: 3, title: 'Flexbox Froggy', instructions: 'Complete the Flexbox Froggy Exercises', 
          source: 'https://github.com'},
        {id: 4, title: 'AJAX Exercises', instructions: 'Create a static page utilizing at least 2 AJAX calls', 
          source: 'https://github.com'},
        {id: 5, title: 'Promise Exercises', instructions: 'Create a front end application using at least 2 promises', 
          source: 'https://github.com'},
        {id: 6, title: 'Phase 1 Project', instructions: 'Use what you have learned so far to create a responsive front end web application', 
          source: 'https://github.com'},
        {id: 7, title: 'Headmaster2', instructions: 'Create a full stack application demo using KnexJS and ExpressJS', 
          source: 'https://github.com'},
      ]);
    });
};

// .createTable('assignments', (table) => {
//   table.increments('id');
//   table.string('title', 255).notNullable();
//   table.string('instructions');
//   table.string('source', 255);
// })