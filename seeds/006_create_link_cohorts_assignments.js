exports.seed = function(knex) {
  return randomizeAssignmentsCohorts(knex) 
  .then(values => {
    console.log(values)
    return knex('link_cohorts_assignments')
    .insert( values)
    .catch(err => {console.log('cohort-assignments error - ', err)});
  })
}

async function randomizeAssignmentsCohorts(knex) {
  let cohortsPromise = new Promise((resolve, reject) => {
    knex.table('cohorts')
    .select('id', 'startDate')
    .then(rows => {
      resolve(rows)
    })
  })

  let assignmentPromise = new Promise((resolve, reject) => {
    knex.table('assignments')
    .pluck('id')
    .then(instructorIds => {
      resolve(instructorIds)
    })
  })

  return Promise.all([cohortsPromise, assignmentPromise])
  .then(values => {
    let cohorts = values[0]
    let assignments = values[1]
    let output = []

    cohorts.forEach(cohort => {
      for (let idx=0; idx < assignments.length; idx++) {
        output.push({
          "cohortId" : cohort.id,
          "assignmentId" : assignments[idx],
          "dueDate" : "15-12-2019"
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

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}