
exports.up = function(knex) {
  return knex.schema
    .createTable('cohorts', table => {
        table.increments('id')
        table.string('cohort')
        table.date('startDate')
        table.boolean('graduated')
    })
    .createTable('link_cohorts_assignments', (table) => {
        table.string('assignment').references('id').inTable('assignments')
        table.string('cohort').references('id').inTable('cohorts')
        table.date('dueDate')
    })
    .table('students', table => {
        table.dropColumn('cohort')
    })
    .table('students', table => {
        table.string('cohort').references('id').inTable('cohorts')
    })
    
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('cohorts')
        .dropTable('link_cohorts_assignments')
  
};
