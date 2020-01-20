
// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      port : '5432',
      database: 'headmaster2',
      user:     'testUser',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    debug : true,
    ssl : true,
    connection : process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};