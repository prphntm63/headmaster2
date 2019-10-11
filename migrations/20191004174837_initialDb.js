
exports.up = function(knex) {
    return knex.schema
        // .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
        .createTable('cohorts', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            // table.increments('id').primary();
            table.string('cohortName')
            table.date('startDate')
            table.boolean('graduated')
        })
        .createTable('students', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            // table.increments('id').primary();
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('github', 255);
            table.unique('github');
            table.uuid('cohort').references('id').inTable('cohorts').notNull();
        })
        .createTable('assignments', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            // table.increments('id').primary();
            table.string('title', 255).notNullable();
            table.string('instructions');
            table.string('source', 255);
        })
        .createTable('link_assignments_students', (table) => {
            table.uuid('studentId').references('id').inTable('students').notNull();
            table.uuid('assignmentId').references('id').inTable('assignments').notNull();
            table.json('answers');
            table.boolean('submitted');
            table.integer('grade');
        })
        .createTable('link_cohorts_assignments', (table) => {
            table.uuid('assignmentId').references('id').inTable('assignments').notNull()
            table.uuid('cohortId').references('id').inTable('cohorts').notNull()
            table.date('dueDate')
        })
    
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('link_assignments_students')
        .dropTable('link_cohorts_assignments')
        .dropTable('students')
        .dropTable('cohorts')
        .dropTable('assignments')
  
};
