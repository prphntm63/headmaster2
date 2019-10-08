
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('link_assignments_students').insert([
        {studentId: '1', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 100},
        {studentId: '2', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 95},
        {studentId: '3', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 90},
        {studentId: '4', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 85},
        {studentId: '5', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 80},
        {studentId: '6', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 75},
        {studentId: '7', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 70},
        {studentId: '8', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 65},
        {studentId: '9', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 60},
        {studentId: '10', assignmentId: '1', answers: {"answers":"answers"}, submitted: false, grade: 55},
      ]);
    });
};

// .createTable('link_assignmentIds_studentIds', (table) => {
//   table.increments('id');
//   table.string('studentId').references('id').inTable('studentIds');
//   // table.foreign('studentId')
//   table.string('assignmentId').references('id').inTable('assignmentIds');
//   // table.foreign('assignmentId')
//   table.json('answers');
//   table.boolean('submitted');
//   table.integer('grade');
// })
