
exports.seed = function(knex) {
  console.log('Seeding 005-Assignments-Students...')

  return wait(1000)
  .then(randomizeStudentsAssignments(knex))
  .then(values => {
    return knex('link_assignments_students')
    .insert( values )
    .catch(err => {console.log(err)});
  })
};

async function randomizeStudentsAssignments(knex) {
  let studentsPromise = new Promise((resolve, reject) => {
    knex.table('students')
    .pluck('id')
    .then(studentIds => {
      resolve(studentIds)
    })
  })

  let assignmentsPromise = new Promise((resolve, reject) => {
    knex.table('assignments')
    .pluck('id')
    .then(instructorIds => {
      resolve(instructorIds)
    })
  })

  return Promise.all([studentsPromise, assignmentsPromise])
  .then(values => {
    let studentIds = values[0]
    let assignmentIds = values[1]
    let output = []

    studentIds.forEach(studentId => {
      let tempAssignments = assignmentIds.slice()
      for (let idx=0; idx < rng(1,6); idx++) {
        let assignment = tempAssignments.splice(idx, idx+1)
        output.push({
          "studentId" : studentId,
          "assignmentId" : assignment[0] ? assignment[0] : assignmentIds[0],
          "submitted" : Math.random()>0.5,
          "grade" : Math.floor(Math.random() * 100),
          "answers" : JSON.stringify({"answers" : "answers"})
        })
      }
    })
    return output
  })
}

function rng(lower, upper) {
  let range = upper - lower;
  let random = Math.floor(Math.random() * range)
  return random + lower;
}

function wait(ms) {
  let waitPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(true)
    }, ms)
  })

  return waitPromise
}