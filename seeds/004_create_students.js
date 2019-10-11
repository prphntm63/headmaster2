exports.seed = function(knex) {
  console.log('Seeding 004-Students...')

  return knex('students')
  .then(() => {
    return knex.table('cohorts')
    .pluck('id')
  }) 
  .then(cohortIds => {
    // Inserts seed entries
    return knex('students').insert( generateStudents(10, cohortIds) );
  })
  .catch(err => {
    console.log('students error - ', err)
  })

  
};

function generateStudents(numStudents, cohortIds) {
  if (!numStudents) {
    numStudents = 10
  }
  let students = []

  for (let idx=0; idx<numStudents; idx++) {
    students.push(generateRandomStudent(null, cohortIds))
  }

  return students;
}

function generateRandomStudent(id, cohortIds) {
  let name = randomName()
  let student = {
    firstName: name.firstName, 
    lastName: name.lastName, 
    github: name.github, 
    cohort: getRandomCohortId(cohortIds), 
    status: getRandomStatus(), 
    active:true, 
    weeklyCommits : Math.floor(Math.random() * 30), 
    weeklyLinesCode : Math.floor(Math.random() * 1000),
    commitHistory : generateRandomGithubEvents()
  }

  if (id) {
    student.id = id
  }

  return student
}

function getRandomCohortId(cohortIds) {
  let randomCohort = cohortIds[ Math.floor(Math.random() * cohortIds.length) ] 
  return randomCohort ? randomCohort : cohortIds[0]
}

function getRandomStatus() {
  let statusList = ['red', 'yellow', 'green']
  return statusList[Math.floor(Math.random() * statusList.length)]
}

function generateRandomGithubEvents() {
  let lastDate = Date.now()
  let firstDate = new Date(lastDate - (1000*60*60*24*7*2))
  // api.github.com/users/prphntm/events
  let sampleEvent = {
    "id": "10464736396",
    "type": "PushEvent",
    "actor": {
      "id": 4017530,
      "login": "prphntm63",
      "display_login": "prphntm63",
      "gravatar_id": "",
      "url": "https://api.github.com/users/prphntm63",
      "avatar_url": "https://avatars.githubusercontent.com/u/4017530?"
    },
    "repo": {
      "id": 204183427,
      "name": "prphntm63/friendgen",
      "url": "https://api.github.com/repos/prphntm63/friendgen"
    },
    "payload": {
      "push_id": 4060025130,
      "size": 1,
      "distinct_size": 1,
      "ref": "refs/heads/master",
      "head": "7c27fade623dca2a38699ef0fdb977cb487880fb",
      "before": "a5fe27bc83a98df816ad7752f0323f42b09543ad",
      "commits": generateRandomNumberOfCommits
        ({
          "sha": "7c27fade623dca2a38699ef0fdb977cb487880fb",
          "author": {
            "email": "matt.westwick@gmail.com",
            "name": "Matt Westwick"
          },
          "message": "CHANGED TO PRODUCTION APP",
          "distinct": true,
          "url": "https://api.github.com/repos/prphntm63/friendgen/commits/7c27fade623dca2a38699ef0fdb977cb487880fb"
        })
    },
    "public": true,
    "created_at": randomDate(firstDate, lastDate, 8, 17)
  }
  // can get commit info thru GET api.github.com/repos/:owner/:repo/commits/:ref

  let randomNumber = (Math.floor(Math.random() * 20))
  let outputArray = []

  for (let idx=0; idx<randomNumber; idx++) {
    outputArray.push(sampleEvent)
  }

  return JSON.stringify(outputArray);
}

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  // let dateString = date.toISOString()
  return date
}

function generateRandomNumberOfCommits(commit) {
  let randomNumber = Math.floor(Math.random() * 5)
  let outputArray = [];
  for (let idx=0; idx<randomNumber; idx++) {
    outputArray.push(commit)
  }

  return outputArray
}

function randomName() {
  let names = [{
    "firstName": "Karlens",
    "lastName": "Knapp",
    "github": "kknapp0"
  }, {
    "firstName": "Felisha",
    "lastName": "Lundbeck",
    "github": "flundbeck1"
  }, {
    "firstName": "Baillie",
    "lastName": "MacPherson",
    "github": "bmacpherson2"
  }, {
    "firstName": "Patrick",
    "lastName": "Eiler",
    "github": "peiler3"
  }, {
    "firstName": "Kaitlynn",
    "lastName": "Graddell",
    "github": "kgraddell4"
  }, {
    "firstName": "Ardys",
    "lastName": "Eldrett",
    "github": "aeldrett5"
  }, {
    "firstName": "Adelind",
    "lastName": "Mebes",
    "github": "amebes6"
  }, {
    "firstName": "Olympia",
    "lastName": "Stickins",
    "github": "ostickins7"
  }, {
    "firstName": "Walker",
    "lastName": "Oakhill",
    "github": "woakhill8"
  }, {
    "firstName": "Gil",
    "lastName": "Limeburn",
    "github": "glimeburn9"
  }, {
    "firstName": "Tedmund",
    "lastName": "Muckley",
    "github": "tmuckleya"
  }, {
    "firstName": "Asher",
    "lastName": "Joost",
    "github": "ajoostb"
  }, {
    "firstName": "Aloin",
    "lastName": "Noot",
    "github": "anootc"
  }, {
    "firstName": "Briant",
    "lastName": "MacKniely",
    "github": "bmacknielyd"
  }, {
    "firstName": "Daryl",
    "lastName": "Kilford",
    "github": "dkilforde"
  }, {
    "firstName": "Winslow",
    "lastName": "Instone",
    "github": "winstonef"
  }, {
    "firstName": "Wenona",
    "lastName": "Jeanon",
    "github": "wjeanong"
  }, {
    "firstName": "Byrle",
    "lastName": "Covill",
    "github": "bcovillh"
  }, {
    "firstName": "Harriott",
    "lastName": "Cundy",
    "github": "hcundyi"
  }, {
    "firstName": "Iormina",
    "lastName": "Wellman",
    "github": "iwellmanj"
  }, {
    "firstName": "Sybila",
    "lastName": "Dehm",
    "github": "sdehmk"
  }, {
    "firstName": "Connie",
    "lastName": "Svanini",
    "github": "csvaninil"
  }, {
    "firstName": "Dewie",
    "lastName": "Mintoff",
    "github": "dmintoffm"
  }, {
    "firstName": "Emalia",
    "lastName": "Bru",
    "github": "ebrun"
  }, {
    "firstName": "Sanderson",
    "lastName": "Durtnel",
    "github": "sdurtnelo"
  }, {
    "firstName": "Reyna",
    "lastName": "Feltham",
    "github": "rfelthamp"
  }, {
    "firstName": "Niven",
    "lastName": "Spilsburie",
    "github": "nspilsburieq"
  }, {
    "firstName": "Madelyn",
    "lastName": "Stitwell",
    "github": "mstitwellr"
  }, {
    "firstName": "Sterne",
    "lastName": "Thrussell",
    "github": "sthrussells"
  }, {
    "firstName": "Fax",
    "lastName": "Clark",
    "github": "fclarkt"
  }, {
    "firstName": "Heloise",
    "lastName": "Lombardo",
    "github": "hlombardou"
  }, {
    "firstName": "Winnie",
    "lastName": "Alexsandrowicz",
    "github": "walexsandrowiczv"
  }, {
    "firstName": "Nero",
    "lastName": "Wimms",
    "github": "nwimmsw"
  }, {
    "firstName": "Franni",
    "lastName": "O'Henehan",
    "github": "fohenehanx"
  }, {
    "firstName": "Kaile",
    "lastName": "Duly",
    "github": "kdulyy"
  }, {
    "firstName": "Freddie",
    "lastName": "Harwin",
    "github": "fharwinz"
  }, {
    "firstName": "Phillipp",
    "lastName": "Glazebrook",
    "github": "pglazebrook10"
  }, {
    "firstName": "Marje",
    "lastName": "Flear",
    "github": "mflear11"
  }, {
    "firstName": "Laurel",
    "lastName": "Dach",
    "github": "ldach12"
  }, {
    "firstName": "Nydia",
    "lastName": "Bentke",
    "github": "nbentke13"
  }, {
    "firstName": "Edmund",
    "lastName": "Prandy",
    "github": "eprandy14"
  }, {
    "firstName": "Mel",
    "lastName": "McMychem",
    "github": "mmcmychem15"
  }, {
    "firstName": "Way",
    "lastName": "Hurford",
    "github": "whurford16"
  }, {
    "firstName": "Krispin",
    "lastName": "Abeau",
    "github": "kabeau17"
  }, {
    "firstName": "Caitrin",
    "lastName": "Zapata",
    "github": "czapata18"
  }, {
    "firstName": "Karel",
    "lastName": "Paulucci",
    "github": "kpaulucci19"
  }, {
    "firstName": "Jamie",
    "lastName": "Burgon",
    "github": "jburgon1a"
  }, {
    "firstName": "Gale",
    "lastName": "Petrik",
    "github": "gpetrik1b"
  }, {
    "firstName": "Fayre",
    "lastName": "Feldstern",
    "github": "ffeldstern1c"
  }, {
    "firstName": "Ferdy",
    "lastName": "Monnery",
    "github": "fmonnery1d"
  }]

  let randomNumber = Math.floor(Math.random() * names.length)

  return names[randomNumber]
}
