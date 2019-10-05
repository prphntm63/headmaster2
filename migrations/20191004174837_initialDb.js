
exports.up = function(knex) {
    return knex.schema
        .createTable('cohorts', table => {
            table.increments('id')
            table.string('cohort')
            table.date('startDate')
            table.boolean('graduated')
        })
        .createTable('students', (table) => {
            table.increments('id');
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('github', 255);
            table.string('cohort').references('id').inTable('cohorts');
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
            table.string('assignment').references('id').inTable('assignments');
            table.json('answers');
            table.boolean('submitted');
            table.integer('grade');
        })
        .createTable('link_cohorts_assignments', (table) => {
            table.string('assignment').references('id').inTable('assignments')
            table.string('cohort').references('id').inTable('cohorts')
            table.date('dueDate')
        })
    
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('cohorts')
        .dropTable('students')
        .dropTable('assignments')
        .dropTable('link_assignments_students')
        .dropTable('link_cohorts_assignments')
  
};
