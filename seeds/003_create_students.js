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

// async function generateStudents(cohortIds) {
//   let numStudents = 40
//   let students = []

//   for (let idx=0; idx<numStudents; idx++) {
//     students.push(generateRandomStudent(null, cohortIds))
//   }

//   return Promise.all(students);
// }

function generateStudents() {
  let numStudents = 50
  
  let fetch = new Promise((resolve, reject) => {
    https.get(`https://randomuser.me/api/?results=${numStudents}`, res => {
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
  .then(responseJsonArray => {
    let students = []

    responseJsonArray.results.forEach(responseJson => {
      let student = {
        firstName: responseJson.name.first, 
        lastName: responseJson.name.last, 
        github: responseJson.login.username, 
        photoUrl : responseJson.picture.large,
      }

      // if (id) {
      //   student.id = id
      // }
      students.push(student)
    })
    return students
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
