function generateCohorts() {
    return [
        {id: 'c1', name: 'Evening Weeknight Group', slug: 'C01', startDate: '01-06-2019', archived: false},
        {id: 'c2', name: 'Weekend All-Day Group', slug: 'C02', startDate: '01-08-2019', archived: false},
        {id: 'c3', name: 'Tuesday and Thursday Afternoon Group', slug: 'C03', startDate: '01-10-2019', archived: false},
        {id: 'c4', name: 'Weekday All-Day Group', slug: 'C04', startDate: '01-10-2019', archived: false},
    ]
}
  
function generateStudents() {
    let numStudents = 50

    return fetch(`https://randomuser.me/api/?results=${numStudents}`)
    .then(res => {
        return res.json()
    })
    .then(responseJsonArray => {
        let students = []

        responseJsonArray.results.forEach(responseJson => {
        let student = {
            id: responseJson.login.uuid,
            ctime : new Date(),
            mtime : new Date(),
            firstName: responseJson.name.first, 
            lastName: responseJson.name.last, 
            github: responseJson.login.username, 
            photoUrl : responseJson.picture.large,
            enrolledStatus : true
        }

        students.push(student)
        })
        return students
    })
}

// ***** GENERATE TOUCHPOINTS *****

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

// ***** GENERATE COMMITS *****

function generateCommits(students) {
    let numCommits = rng(300,600)
    let commitPromises = []

    for (let idx=0; idx<numCommits; idx++) {
        let commitPromise = new Promise((resolve, reject) => {
            generateRandomCommit(students)
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

function generateRandomCommit(students) {
    return new Promise((resolve, reject) => {
        let numStudents = students.length;
        let randomStudent = students[Math.floor(Math.random() * numStudents)]
        let lastDate = Date.now()
        let firstDate = new Date(lastDate - (1000*60*60*24*7*2))
        let adds = rng(10,150)
        let subs = rng(5,100)
        let total = adds + subs

        resolve({
            "student" : randomStudent.id,
            "repo" : randomStudent.github + "/" + generateRandomMessage(1),
            "sha" : "7c27fade623dca2a38699ef0fdb977cb487880fb",
            "message" : generateRandomMessage( rng(3,15) ),
            "total" : total,
            "added" : adds,
            "deleted" : subs,
            "ctime" : randomDate(firstDate, lastDate, 8, 17)
        })
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