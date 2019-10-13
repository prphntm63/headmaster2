exports.seed = function(knex) {
  console.log('Seeding 006-Cohorts-Users')

  return randomizeInstructorsCohorts(knex)
  .then(values => {
    return knex('LinkCohortsUsers')
    .insert( values )
    .catch(err => {console.log('cohorts-users error - ', err)});
  })
}

async function randomizeInstructorsCohorts(knex) {

  let cohortsPromise = new Promise((resolve, reject) => {
    knex.table('Cohorts')
    .pluck('id')
    .then(cohortIds => {
      resolve(cohortIds)
    })
  })

  let instructorsPromise = new Promise((resolve, reject) => {
    knex.table('Users')
    .pluck('id')
    .then(instructorIds => {
      resolve(instructorIds)
    })
  })

  return Promise.all([cohortsPromise, instructorsPromise])
  .then(values => {
    let adminRole = true;
    let cohorts = values[0]
    let instructors = values[1]
    let output = []

    // Assign random number of cohorts to each instructor
    instructors.forEach(instructor => {
      let tempCohorts = cohorts.slice().sort(() => {return .5 - Math.random()})
      for (let idx=0; idx < rng(1,3); idx++) {
        let cohort = tempCohorts.splice(idx, idx+1)
        output.push({
          "user" : instructor,
          "cohort" : cohort[0] ? cohort[0] : cohorts[0],
          "role" : adminRole ? "admin" : ["instructor", "ta"][Math.round(Math.random())] 
        })
        if (adminRole) {
          adminRole = false
        }
      }
    })

    // Make sure each cohort has at least one instructor
    cohorts.forEach(cohort => {
      if ( !findCohort(cohort, output) ) {
        output.push({
          "user" : instructors[rng(0, instructors.length)],
          "cohort" : cohort,
          "role" : "instructor" 
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

function findCohort(cohortId, outputArray) {
  return outputArray.find( element => {
    element.cohort === cohortId
  })
}