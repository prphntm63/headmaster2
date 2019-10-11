exports.seed = function(knex) {
  console.log('Seeding 006-Cohorts-Assignments...')

  return randomizeAssignmentsCohorts(knex)
  .then(values => {
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
    let dueDates = []
    let output = []

    cohorts.forEach(cohort => {
      for (let idx=0; idx < assignments.length; idx++) {
        let initialDate = cohort.startDate;
        let interval = (7*24*60*60*1000 * idx)
        let newDate = new Date(initialDate.getTime() + interval)

        output.push({
          "cohortId" : cohort.id,
          "assignmentId" : assignments[idx],
          "dueDate" : newDate
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
