
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('link_assignments_students').insert([
        {id: 1, student: '1', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 100},
        {id: 2, student: '2', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 95},
        {id: 3, student: '3', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 90},
        {id: 4, student: '4', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 85},
        {id: 5, student: '5', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 80},
        {id: 6, student: '6', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 75},
        {id: 7, student: '7', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 70},
        {id: 8, student: '8', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 65},
        {id: 9, student: '9', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 60},
        {id: 10, student: '10', assignment: '1', answers: {"answers":"answers"}, submitted: false, grade: 55},
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
