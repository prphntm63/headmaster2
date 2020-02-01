
exports.up = function(knex) {
     //Delete and/or rename existing duplicates (we don't want to concat cohorts if slugs/names were accidentally the same)
    return knex.raw(`
        DELETE FROM "LinkCohortsStudents"
        WHERE ctid IN (SELECT ctid
            FROM   (SELECT ctid,
                        ROW_NUMBER() OVER (
                            PARTITION BY cohort, student) AS rn
                FROM   "LinkCohortsStudents") t
            WHERE  rn > 1);
    `)
    .then(() => {
        return knex.raw(`
        DELETE FROM "LinkCohortsUsers"
        WHERE ctid IN (SELECT ctid
            FROM   (SELECT ctid,
                        ROW_NUMBER() OVER (
                            PARTITION BY cohort, user) AS rn
                FROM   "LinkCohortsUsers") t
            WHERE  rn > 1);
        `)
    })
    .then(() => {
        // This is kind of sloppy, but works. Basically append a uuid() to duplicate slugs
        return knex.raw(`
        UPDATE "Cohorts" c1
        SET 
        slug = concat(slug, '_', uuid_generate_v1())
        WHERE ctid IN (SELECT ctid
            FROM   (SELECT ctid,
                        ROW_NUMBER() OVER (
                            PARTITION BY slug ) AS rn
                FROM   "Cohorts") t
            WHERE  rn > 1);
        `)
    })
    .then(() => {
        return knex.raw(`
        DELETE FROM "Commits"
        WHERE ctid IN (SELECT ctid
            FROM   (SELECT ctid,
                        ROW_NUMBER() OVER (
                            PARTITION BY sha ) AS rn
                FROM   "Commits") t
            WHERE  rn > 1);
        `)
    })
    .then(() => {
        return knex.schema
        .alterTable('Cohorts', table => {
            table.unique('name')
            table.unique('slug')
        })
        .alterTable('Commits', table => {
            table.unique('sha')
        })
        .alterTable('LinkCohortsStudents', table => {
            table.unique(['cohort', 'student'])
        })
        .alterTable('LinkCohortsUsers', table => {
            table.unique(['cohort', 'user'])
        })
    })
    
};

exports.down = function(knex) {
    return knex.schema
    .alterTable('Cohorts', table => {
        table.dropUnique('name')
        table.dropUnique('slug')
    })
    .alterTable('Commits', table => {
        table.dropUnique('sha')
    })
    .alterTable('LinkCohortsStudents', table => {
        table.dropUnique(['cohort', 'student'])
    })
    .alterTable('LinkCohortsUsers', table => {
        table.dropUnique(['cohort', 'user'])
    })
};
