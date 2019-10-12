
exports.seed = function(knex) {
  console.log('Seeding 005-Cohorts-Students...')

  return generateStudentCohortRelationships(knex)
  .then( values => {
    return knex('LinkCohortsStudents').insert(values)
  })
  .catch(err => {
    console.log('Error seeding Cohorts-Students - ', err)
  })
};

function generateStudentCohortRelationships(knex) {
  return knex('Students')
  .pluck('id')
  .then(studentIds => {
    let studentPromises = []

    studentIds.forEach(studentId => {
      let studentPromise = new Promise((resolve, reject) => {
        generateRandomCohortId(knex)
        .then(cohortId => {
          resolve( {
            student : studentId,
            cohort : cohortId
          })
        })
      })

      studentPromises.push(studentPromise)
    })

    return Promise.all(studentPromises)
    .then(studentCohortArray => {
      return flatDeep(studentCohortArray)
    })
  })
}

function generateRandomCohortId(knex) {
  return knex('Cohorts')
  .pluck('id')
  .then(cohortIds => {
    let randomCohort = cohortIds[ Math.floor(Math.random() * cohortIds.length) ] 
    return randomCohort ? randomCohort : cohortIds[0]
  })
}

function flatDeep(arr) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
};