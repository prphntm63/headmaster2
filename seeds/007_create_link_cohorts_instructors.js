exports.seed = function(knex) {
  console.log('Seeding 007-Cohorts-Instructors')

  return wait(1000)
  .then(randomizeInstructorsCohorts(knex))
  .then(values => {
    return knex('link_cohorts_instructors')
    .insert( values )
    .catch(err => {console.log('cohorts-instructors error - ', err)});
  })
}

async function randomizeInstructorsCohorts(knex) {

  let cohortsPromise = new Promise((resolve, reject) => {
    knex.table('cohorts')
    .pluck('id')
    .then(cohortIds => {
      resolve(cohortIds)
    })
  })

  let instructorsPromise = new Promise((resolve, reject) => {
    knex.table('instructors')
    .pluck('id')
    .then(instructorIds => {
      resolve(instructorIds)
    })
  })

  return Promise.all([cohortsPromise, instructorsPromise])
  .then(values => {
    let cohorts = values[0]
    let instructors = values[1]
    let output = []

    instructors.forEach(instructor => {
      let tempCohorts = cohorts.slice()
      for (let idx=0; idx < rng(1,3); idx++) {
        let cohort = tempCohorts.splice(idx, idx+1)
        output.push({
          "instructor" : instructor,
          "cohort" : cohort[0] ? cohort[0] : cohorts[0]
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
