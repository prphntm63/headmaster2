
exports.up = function(knex) {
    return knex.schema
        .createTable('students', (table) => {
            table.increments('id');
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('github', 255);
            table.string('cohort', 255).notNullable();
        })
        .createTable('assignments', (table) => {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('instructions');
            table.string('source', 255);
        })
        .createTable('link_assignments_students', (table) => {
            table.increments('id');
            table.foreign('student').references('students.id');
            table.foreign('assignment').references('assignment.id');
            table.json('answers');
            table.boolean('submitted');
            table.integer('grade');
        })
    
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('students')
        .dropTable('assignments')
        .dropTable('link_assignments_students')
  
};
