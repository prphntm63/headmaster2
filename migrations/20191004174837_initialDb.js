
exports.up = function(knex) {
    return knex.schema
        // .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
        .createTable('Cohorts', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.timestamp('mtime').defaultTo(knex.fn.now())
            // table.increments('id').primary();
            table.string('name')
            table.string('slug')
            table.date('startDate')
            table.boolean('graduated')
        })
        .createTable('Users', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.timestamp('mtime').defaultTo(knex.fn.now())
            // table.increments('id').primary();
            table.string('firstName');
            table.string('lastName');
            table.string('photoUrl');
            table.string('github');
            table.unique('github');
        })
        .createTable('Students', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.timestamp('mtime').defaultTo(knex.fn.now())
            // table.increments('id').primary();
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('github', 255);
            table.unique('github');
            table.enu('stoplightStatus', ['red', 'yellow', 'green']);
            table.boolean('enrolledStatus');
            table.string('photoUrl');
        })
        .createTable('Commits', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.uuid('student').references('id').inTable('Students').notNull();
            table.string('sha')
            table.string('message')
            table.string('repo')
            table.integer('total')
            table.integer('added')
            table.integer('deleted')
        })
        .createTable('Touchpoints', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            table.timestamp('ctime').defaultTo(knex.fn.now())
            table.timestamp('mtime').defaultTo(knex.fn.now())
            // table.increments('id').primary();
            table.timestamp('createdAt', { useTz : true });
            table.uuid('student').references('id').inTable('Students').notNull();
            table.enu('status', ['red', 'yellow', 'green']);
            table.json('tags')
            table.string('comment')
            table.uuid('user').references('id').inTable('Users').notNull()
        })
        .createTable('LinkCohortsStudents', (table) => {
            table.uuid('cohort').references('id').inTable('Cohorts').notNull();
            table.uuid('student').references('id').inTable('Students').notNull();

        })
        .createTable('LinkCohortsUsers', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            // table.increments('id').primary();
            table.uuid('user').references('id').inTable('Users').notNull();
            table.uuid('cohort').references('id').inTable('Cohorts').notNull();
            table.enu('role', ['admin', 'instructor', 'ta'])
        })
    
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('LinkCohortsUsers')
        .dropTable('LinkCohortsStudents')
        .dropTable('Touchpoints')
        .dropTable('Commits')
        .dropTable('Users')
        .dropTable('Students')
        .dropTable('Cohorts')
  
};

// Assignment tables if needed later
// .createTable('LinkAssignmentsStudents', (table) => {
//     table.uuid('studentId').references('id').inTable('students').notNull();
//     table.uuid('assignmentId').references('id').inTable('assignments').notNull();
//     table.json('answers');
//     table.boolean('submitted');
//     table.integer('grade');
// })
// .createTable('LinkCohortsAssignments', (table) => {
//     table.uuid('assignmentId').references('id').inTable('assignments').notNull()
//     table.uuid('cohortId').references('id').inTable('cohorts').notNull()
//     table.date('dueDate')
// })
// .createTable('Assignments', (table) => {
//     table.uuid('id').primary().defaultTo(knex.raw('CONCAT("assignment-", uuid_generate_v4())'))
//     table.timestamp('ctime').defaultTo(knex.fn.now())
//     table.timestamp('mtime').defaultTo(knex.fn.now())
//     // table.increments('id').primary();
//     table.string('title', 255).notNullable();
//     table.string('instructions');
//     table.string('source', 255);
//     table.string('repo');
// })
