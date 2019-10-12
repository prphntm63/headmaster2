
exports.seed = function(knex) {

  return generateCommits(knex)
  .then(commits => {
    return knex('Commits').insert( commits );
  })
  .catch(err => {
    console.log('Error creating commits - ', err)
  })
};

function generateCommits(knex) {
  let numCommits = rng(100,300)
  let commitPromises = []

  for (let idx=0; idx<numCommits; idx++) {
    let commitPromise = new Promise((resolve, reject) => {
      generateRandomCommit(knex)
      .then(commit => {
        resolve(commit)
      })
    })
    commitPromises.push(commitPromise)
  }

  return Promise.all(commitPromises)
  .then(commitsArrays => {
    return flatDeep(commitsArrays)
  })
}

function generateRandomCommit(knex) {
  return knex.table('Students')
  .select('id', 'github')
  .then(rows => {
    let students = rows
    let numStudents = students.length;
    let randomStudent = students[Math.floor(Math.random() * numStudents)]
    let lastDate = Date.now()
    let firstDate = new Date(lastDate - (1000*60*60*24*7*2))
    let adds = rng(10,150)
    let subs = rng(5,100)
    let total = adds + subs

    return {
      "student" : randomStudent.id,
      "repo" : randomStudent.github + "/" + generateRandomMessage(1),
      "sha" : "7c27fade623dca2a38699ef0fdb977cb487880fb",
      "message" : generateRandomMessage( rng(3,15) ),
      "total" : total,
      "added" : adds,
      "deleted" : subs,
      "ctime" : randomDate(firstDate, lastDate, 8, 17)
    }
  })
  .catch(err => {
    console.log('error getting student - ', err)
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
  // let dateString = date.toISOString()
  return date
}

function generateRandomMessage(length) {
  let words = [
    "the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"
  ]
  let outString = ''

  for (let idx=0; idx<length; idx++) {
    let randomNumber = Math.floor(Math.random() * words.length)
    outString += words[randomNumber] + ' '
  }

  return outString
}

function flatDeep(arr) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
};

// api.github.com/users/prphntm/events
// can get commit info thru GET api.github.com/repos/:owner/:repo/commits/:ref

// .createTable('Commits', table => {
//   table.uuid('id').primary().defaultTo(knex.raw('CONCAT("github-", uuid_generate_v4())'))
//   table.timestamp('ctime').defaultTo(knex.fn.now())
//   table.uuid('student').references('id').inTable('Students').notNull();
//   table.string('sha')
//   table.string('message')
//   table.string('repo')
//   table.integer('total')
//   table.integer('added')
//   table.integer('deleted')
// })