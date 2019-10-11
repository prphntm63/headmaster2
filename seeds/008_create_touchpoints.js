
exports.seed = function(knex) {
  console.log('Seeding 008-Touchpoints...')

  return generateTouchpoints(knex)
  .then(touchpoints => {
    return knex('touchpoints').insert( touchpoints );
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

          // Generate between 2 and 7 touchpoints
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
    "createdAt" : randomDate(student.startDate, Date.now(), 8, 5),
    "student" : student.id,
    "instructor" : instructorObject ? instructorObject.instructor : instructors[0],
    "status" : status,
    "comment" : comment,
  }
}

function getStudents(knex) {
  return knex('students')
  .innerJoin('cohorts', 'students.cohort', '=', 'cohorts.id')
  .select('students.*', 'cohorts.startDate as startDate')
}

function getInstructors(knex, cohortId) {
  return knex('link_cohorts_instructors')
  .select('instructor')
  .where('cohort', '=', cohortId)
}

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

function randomStatus() {
  let statuses = ['red', 'yellow', 'green', 'green']
  return statuses[rng(0,3)] //fudging rng so I don't have to make new function, lol
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

function rng(lower, upper) {
  let range = upper - lower;
  let random = Math.floor(Math.random() * range)
  return random + lower;
}

function flatDeep(arr) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
};

  // table.timestamp('createdAt', { useTz : true });
  // table.uuid('student').references('id').inTable('students').notNull();
  // table.enu('status', ['red', 'yellow', 'green']);
  // table.string('comment')
  // table.uuid('instructor').references('id').inTable('instructors').notNull()