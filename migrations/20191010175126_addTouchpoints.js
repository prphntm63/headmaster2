
exports.up = function(knex) {
    return knex.schema
        .table('students', table => {
            table.enu('status', ['red', 'yellow', 'green']);
            table.boolean('active');
            table.json('commitHistory');
            table.integer('weeklyCommits');
            table.integer('weeklyLinesCode');
            table.binary('profilePic');
        })
        .table('link_assignments_students', table => {
            table.string('repo');
        })
        .createTable('instructors', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            // table.increments('id').primary();
            table.string('firstName');
            table.string('lastName');
            table.binary('profilePic');
            table.string('github');
            table.unique('github');
            table.enu('role', ['admin', 'instructor', 'ta'])
        })
        .createTable('touchpoints', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            // table.increments('id').primary();
            table.timestamp('createdAt', { useTz : true });
            table.uuid('student').references('id').inTable('students').notNull();
            table.enu('status', ['red', 'yellow', 'green']);
            table.string('comment')
            table.uuid('instructor').references('id').inTable('instructors').notNull()
        })
        .createTable('link_cohorts_instructors', table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
            // table.increments('id').primary();
            table.uuid('instructor').references('id').inTable('instructors').notNull();
            table.uuid('cohort').references('id').inTable('cohorts').notNull();
        })
};

exports.down = function(knex) {
    return knex.schema
        .table('students', table => {
            table.dropColumn('status');
            table.dropColumn('active');
            table.dropColumn('commitHistory');
            table.dropColumn('weeklyCommits');
            table.dropColumn('weeklyLinesCode');
            table.dropColumn('profilePic');
        })
        .table('link_assignments_students', table => {
            table.dropColumn('repo');
        })
        .dropTable('link_cohorts_instructors')
        .dropTable('touchpoints')
        .dropTable('instructors')
};