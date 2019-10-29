const https = require('https');

exports.seed = function(knex) {
  console.log('Seeding 004-Students...')

  return knex('Students')
  .then(generateStudents)
  .then(students => {
    // Inserts seed entries
    return knex('Students').insert( students );
  })
  .catch(err => {
    console.log('students error - ', err)
  })

  
};

function generateStudents(cohortIds) {
  let numStudents = 10
  let students = []

  for (let idx=0; idx<numStudents; idx++) {
    students.push(generateRandomStudent(null, cohortIds))
  }

  return Promise.all(students);
}

function generateRandomStudent(id, cohortIds) {
  let fetch = new Promise((resolve, reject) => {
    https.get('https://randomuser.me/api/', res => {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', data=> {
        body += data;
      })
      res.on('end', () => {
        let outJson = JSON.parse(body)
        resolve(outJson)
      })
    })
  })

  return fetch
  .then(responseJson => {
    // let name = randomName()
    let name = responseJson.results[0]
    let student = {
      firstName: name.name.first, 
      lastName: name.name.last, 
      github: name.login.username + Math.floor(Math.random() * 100), 
      photoUrl : name.picture.large,
    }

    if (id) {
      student.id = id
    }
    return student
  })

  
}

// table.uuid('id').primary().defaultTo(knex.raw('CONCAT("student-", uuid_generate_v4())'))
// table.timestamp('ctime').defaultTo(knex.fn.now())
// table.timestamp('mtime').defaultTo(knex.fn.now())
// // table.increments('id').primary();
// table.string('firstName', 255).notNullable();
// table.string('lastName', 255).notNullable();
// table.string('github', 255);
// table.unique('github');
// table.enu('stoplightStatus', ['red', 'yellow', 'green']);
// table.boolean('enrolledStatus');
// table.binary('profilePic');

function getRandomStatus() {
  let statusList = ['red', 'yellow', 'green']
  return statusList[Math.floor(Math.random() * statusList.length)]
}
