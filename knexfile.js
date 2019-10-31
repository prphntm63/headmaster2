// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      port : '5433',
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

  staging: {
    client: 'postgresql',
    connection: {
      database: 'headmaster2',
      user:     'testuser',
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
    client: 'postgresql',
    connection: {
      database: 'headmaster2',
      user:     'testuser',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
