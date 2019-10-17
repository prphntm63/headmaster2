
exports.seed = function(knex) {
  console.log('Seeding 007-Touchpoints...')

  return generateTouchpoints(knex)
  .then(touchpoints => {
    return knex('Touchpoints').insert( touchpoints );
  })
  .catch(err => {
    console.log('Error creating touchpoints - ', err)
  })

};

function generateTouchpoints(knex) {
  let studentPromises = []

  return getStudents(knex)
  .then(students => {

    students.forEach(student => {
      let studentCohort = student.cohort;
      let studentPromise = new Promise((resolve, reject) => {
        getInstructors(knex, studentCohort)
        .then(instructors => {
          let studentTouchpoints = [];

          // Generate between 2 and 7 touchpoints per student
          for (let idx=0; idx<rng(2,7); idx++) {
            studentTouchpoints.push( generateTouchpoint(student,instructors) )
          }

          resolve( studentTouchpoints )

        })
      })

      studentPromises.push(studentPromise)
    })

    return Promise.all(studentPromises)
  })
  .then(touchpoints => {
    return flatDeep(touchpoints)
  })
}

function generateTouchpoint(student, instructors) {
  let status = randomStatus()
  // Leave some comments blank
  let comment = rng(0, 5) > 2 ? generateRandomComment(status) : null
  let instructorObject = instructors[ rng(0, instructors.length) ]

  return {
    "ctime" : randomDate(student.startDate, Date.now(), 8, 5),
    "student" : student.id,
    "user" : instructorObject ? instructorObject.user : instructors[0],
    "stoplightStatus" : status,
    "tags" : JSON.stringify( generateRandomTags(status, rng(0,3) ) ),
    "comment" : comment,
  }
}

// .createTable('Touchpoints', table => {
//   table.uuid('id').primary().defaultTo(knex.raw('CONCAT("toucpoint-", uuid_generate_v4())'))
//   table.timestamp('ctime').defaultTo(knex.fn.now())
//   table.timestamp('mtime').defaultTo(knex.fn.now())
//   // table.increments('id').primary();
//   table.timestamp('createdAt', { useTz : true });
//   table.uuid('student').references('id').inTable('Students').notNull();
//   table.enu('status', ['red', 'yellow', 'green']);
//   table.json('tags')
//   table.string('comment')
//   table.uuid('user').references('id').inTable('Users').notNull()
// })

function getStudents(knex) {
  return knex('Students')
  .innerJoin('LinkCohortsStudents', 'Students.id', '=', 'LinkCohortsStudents.student')
  .innerJoin('Cohorts', 'LinkCohortsStudents.cohort', '=', 'Cohorts.id')
  .select('Students.*', 'Cohorts.startDate as startDate', 'LinkCohortsStudents.cohort as cohort')
}

function getInstructors(knex, cohortId) {
  return knex('LinkCohortsUsers')
  .select('user')
  .where('cohort', '=', cohortId)
}

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

function randomStatus() {
  let statuses = ['red', 'yellow', 'green', 'green', 'green'] //fudging biased rng
  return statuses[rng(0,4)] 
}

function generateRandomComment(status) {

  let comments = {
    green : [
      'Doing great!',
      'No issues',
      'Class leader, actively helps others',
    ],
    yellow : [
      'Quiet and reserved but is getting work done',
      'Not engaged, could use more 1-on-1 attention',
      'Distracting others from learning with memes',
    ],
    red : [
      'Frequently missing class',
      'Needs more coffee',
      'Recommend to spend more time out of class programming'
    ]
  }

  let relevantComments = comments[status]

  return relevantComments[rng(0,relevantComments.length)]
}

function generateRandomTags(status, numTags) {
  let tags = []

  let descriptors = [
    "Comprehension",
    "Work Output",
    "Social Engagement",
    "Energy",
    "Motivation",
    "Attendance",
  ]

  let modifiers = {
    green : "High",
    yellow : "Good",
    red : "Low"
  }

  for (let idx=0; idx<numTags; idx++) {
    // Here we use splice to remove items from descriptors array to avoid duplicate tags
    let descriptor = descriptors.splice( rng(0, descriptors.length) , 1 )
    tags.push({
      "text" : modifiers[status] + " " + descriptor,
      "status" : status
    })
  }

  return tags
}

function rng(lower, upper) {
  let range = upper - lower;
  let random = Math.floor(Math.random() * range)
  return random + lower;
}

// Since Node doesn't support flat() function yet
function flatDeep(arr) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
};

