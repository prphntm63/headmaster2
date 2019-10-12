
exports.seed = function(knex) {
  console.log('Seeding 003-Users...')

  return knex('Users').insert( createInstructors() )
  .catch(err => {console.log('users error - ', err)});;
};

function createInstructors() {
  return [{
    "firstName": "Toby",
    "lastName": "Berks",
    "github": "tberks0",
    "photoUrl" : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
  }, {
    "firstName": "Stephanus",
    "lastName": "Marjanski",
    "github": "smarjanski1",
    "photoUrl" : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
    
  }, {
    "firstName": "Kirbee",
    "lastName": "Sieve",
    "github": "ksieve2",
    "photoUrl" : `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`,
    
  }, {
    "firstName": "Frankie",
    "lastName": "Solley",
    "github": "fsolley3",
    "photoUrl" : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
    
  }, {
    "firstName": "Kirsten",
    "lastName": "Maes",
    "github": "kmaes4",
    "photoUrl" : `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`,
    
  }, {
    "firstName": "Lucilia",
    "lastName": "Van Geffen",
    "github": "lvangeffen5",
    "photoUrl" : `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`,
    
  }]
}


// .createTable('Users', table => {
//   table.uuid('id').primary().defaultTo(knex.raw('CONCAT("user-", uuid_generate_v4())'))
//   table.timestamp('ctime').defaultTo(knex.fn.now())
//   table.timestamp('mtime').defaultTo(knex.fn.now())
//   // table.increments('id').primary();
//   table.string('firstName');
//   table.string('lastName');
//   table.binary('profilePic');
//   table.string('github');
//   table.unique('github');
// })
