
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
            table.string('student').references('id').inTable('students');
            // table.foreign('student')
            table.string('assignment').references('id').inTable('assignments');
            // table.foreign('assignment')
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
