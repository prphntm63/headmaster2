
exports.seed = function(knex) {

  return knex('instructors').insert( createInstructors() )
  .catch(err => {console.log('instructors error - ', err)});;
};

function createInstructors() {
  return [{
    "firstName": "Toby",
    "lastName": "Berks",
    "github": "tberks0",
    "role": "admin"
  }, {
    "firstName": "Stephanus",
    "lastName": "Marjanski",
    "github": "smarjanski1",
    "role": "ta"
  }, {
    "firstName": "Kirbee",
    "lastName": "Sieve",
    "github": "ksieve2",
    "role": "instructor"
  }, {
    "firstName": "Frankie",
    "lastName": "Solley",
    "github": "fsolley3",
    "role": "instructor"
  }, {
    "firstName": "Kirsten",
    "lastName": "Maes",
    "github": "kmaes4",
    "role": "instructor"
  }, {
    "firstName": "Lucilia",
    "lastName": "Van Geffen",
    "github": "lvangeffen5",
    "role": "ta"
  }]
}


// .createTable('instructors', table => {
//   table.uuid('id').primary;
//   table.string('firstName');
//   table.string('lastName');
//   table.binary('profilePic');
//   table.string('github');
//   table.enu('role', ['admin', 'instructor', 'ta'])
// })
