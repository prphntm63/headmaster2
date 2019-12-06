const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config)

let db = {
    // ***** USER METHODS *****
    getUsers : function(userId) {
        // Check to see if user is superadmin
        return knex
        .from('Users')
        .select('Users.github') // Change to sysrole
        .where({'Users.id' : userId})
        .then(rows => {
            return rows[0]
        })
        .then(user => {
            user.sysrole = 'admin' // This is temporary to prevent crashes before superadmin role defined
            
            // if (user.sysrole != 'admin' || user.sysrole != 'superadmin') {
            //     return null
            // }

            return knex
            .from('Users')
            .leftJoin('LinkCohortsUsers', 'Users.id', '=', 'LinkCohortsUsers.user')
            .select(
                'Users.id',
                'Users.firstName', 
                'Users.lastName', 
                'Users.photoUrl', 
                'Users.github',
                knex.raw('COUNT("LinkCohortsUsers".cohort) as "numCohorts"')
            )
            .groupBy('Users.id')
            .then(rows => {
                return rows
            })
        })
    },

    getUserList : function() {
        return knex
        .from('Users')
        .select('Users.id', 'Users.firstName', 'Users.lastName', 'Users.github')
    },

    getUser : function(userId) {
        return knex
        .from('Users')
        .select('*')
        .where('Users.id', '=', userId)
        .then(rows => {
            return rows[0]
        })
        .catch(err => {
            console.log('Error in db.getUser - ', err)
        })
    },

    getUserIdFromGithub(userGithub) {
        return knex
        .from('Users')
        .select('Users.id')
        .where('Users.github', '=', userGithub)
        .then(rows => {
            if (rows.length) {
                let user = rows[0]
                return user.id
            } else {
                return null
            }
            
        })
    },

    createUser : function(userId) {

    },

    updateUser : function(userId, params) {

    },

    authenticateUser : function(accessToken, refreshToken, profile, cb) {

        knex
        .from('Users')
        .select('*')
        .where('Users.github', '=', profile.username)
        .then(rows => {
            if (!rows.length) return cb(null, false, {message : "User Not Registered"})

            let user = rows[0]

            return knex('Users')
            .where('id', '=', user.id)
            .update({
                "mtime" : new Date(),
                "accessToken" : accessToken,
                "refreshToken" : refreshToken,
            })
            .then(() => {
                return cb(null, user)
            })

        })
        .catch(err => {
            return cb(err)
        })
    },

    // ***** STUDENT METHODS *****
    getStudentIdByGithub : function(studentGithub) {
        
        return knex
        .from('Students')
        .select('Students.id')
        .where({"Students.github" : studentGithub})
        .then(rows => {
            if (rows.length) {
                let studentInfo = rows[0]
                return studentInfo.id
            } else {
                return null
            }
        })
    },

    getStudentGithubFromName : async function(firstName, lastName) {
        return knex
        .from('Students')
        .select('Students.github')
        .where({
            "Students.firstName" : firstName,
            "Students.lastName" : lastName
        })
        .then(rows => {
            if (rows.length === 1) {
                let studentInfo = rows[0]
                return studentInfo.github
            } else {
                return null //Either multiple or no students match
            }
        })
    },

    getStudentListByUser : function(userId) {
        if (!userId) return null

        return knex
        .from('Users')
        .join('LinkCohortsUsers', 'Users.id', '=', 'LinkCohortsUsers.user')
        .join('Cohorts', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .join('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .leftOuterJoin('Touchpoints AS tp', knex.raw('(SELECT MAX(ctime) FROM "Touchpoints" WHERE "Touchpoints".student="Students".id)'), '=', "tp.ctime")
        .select('Cohorts.*', 'Students.*', 'tp.*', 'Students.id as studentId')
        .where({'LinkCohortsUsers.user' : userId})
    },

    getStudentByUser : function(userId, studentId) {
        if (!userId || !studentId) return null

        return knex
        .from('Students')
        .leftJoin('Touchpoints AS tp', knex.raw('(SELECT MAX(ctime) FROM "Touchpoints" WHERE "Touchpoints".student="Students".id)'), '=', "tp.ctime")        
        .join('LinkCohortsStudents', 'Students.id', '=', 'LinkCohortsStudents.student')
        .join('Cohorts', 'LinkCohortsStudents.cohort', '=', 'Cohorts.id')
        .join('LinkCohortsUsers', 'Cohorts.id', '=', 'LinkCohortsUsers.cohort')
        .select('tp.*', 'Students.*', 'Cohorts.id as cohortId', 'Cohorts.name as cohortName', 'Students.id as studentId')
        .where({
            'Students.id' : studentId,
            'LinkCohortsUsers.user' : userId
        })
        .catch(err => {
            console.log('error getStudentByUser - ', err)
        })
        
    },

    // getStudentList : function() {
    //     return knex
    //     .from('students')
    //     .join('cohorts', 'students.cohort', '=', 'cohorts.id')
    //     .select('students.id as id', 'students.firstName', 'students.lastName', 'students.github', 'cohorts.cohort', 'cohorts.graduated')
    // },

    // getStudent : function(studentId) {
    //     return knex
    //     .from('students')
    //     .join('cohorts', 'students.cohort', '=', 'cohorts.id')
    //     .join('link_assignments_students', 'students.id', '=', 'link_assignments_students.studentId')
    //     .select('*')
    //     .where({'students.id' : studentId})
    // },

    addStudent : function(formData) {
        let cohort = formData.cohort
        let studentParams = {
            "firstName" : formData.firstName,
            "lastName" : formData.lastName,
            "github" : formData.github,
            "photoUrl" : formData.photoUrl ? formData.photoUrl : '',
        }

        return knex
        .returning('*')
        .insert(studentParams)
        .into('Students')
        .then(studentDataRows => {
            let studentData = studentDataRows[0]
            let linkCohortParams = {
                "student" : studentData.id,
                "cohort" : cohort,
                "enrolledStatus" : formData.enrolledStatus
            }
            return knex
            .returning('*')
            .insert(linkCohortParams)
            .into('LinkCohortsStudents')
            .then(linkStudentCohortDataRows => {
                let linkStudentCohortData = linkStudentCohortDataRows[0]
                studentData.cohort = linkStudentCohortData.cohort
                return studentData
            })
        })
    },

    updateStudent : function(studentId, formData) {
        let cohort = formData.cohort
        let studentParams = {
            "firstName" : formData.firstName,
            "lastName" : formData.lastName,
            "github" : formData.github,
            "photoUrl" : formData.photoUrl ? formData.photoUrl : '',
            "enrolledStatus" : formData.enrolledStatus
        }

        return knex('Students')
        .returning('*')
        .where({'id' : studentId})
        .update(studentParams)
        .then(studentDataRows => {
            let studentData = studentDataRows[0]
            return knex('LinkCohortsStudents')
            .returning('*')
            .where({'student' : studentId})
            .update({
                'cohort' : cohort,
                "enrolledStatus" : formData.enrolledStatus
            })
            .then(linkStudentCohortDataRows => {
                let linkStudentCohortData = linkStudentCohortDataRows[0]
                studentData.cohort = linkStudentCohortData.cohort
                return studentData
            })
        })
    },

    getStudentCommits : function(studentId) {
        return knex
        .from('Commits')
        .join('Students', 'Commits.student', '=', 'Students.id')
        .select('Students.id as studentId', 'Commits.*')
        .where({'Students.id' : studentId})
    },

    // ***** COHORT METHODS *****

    getAllDataByUser : function(userId) {
        return knex
        .from('Users')
        .join('LinkCohortsUsers', 'Users.id', '=', 'LinkCohortsUsers.user')
        .join('Cohorts', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .select('Cohorts.*')
        .where({'LinkCohortsUsers.user' : userId})
        .then(cohortsList => {
            let cohortPromises = []

            cohortsList.forEach(cohort => {
                let cohortPromise = knex
                .from('LinkCohortsStudents')
                .join('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
                .select('Students.*')
                // .select('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.slug')
                .where({'LinkCohortsStudents.cohort' : cohort.id})
                .then(students => {
                    let studentPromises = [];

                    students.forEach(student => {
                        let studentPromise = new Promise((resolve, reject) => {
                            let touchpointsPromse = knex
                            .from('Touchpoints')
                            .select('*')
                            .where({'Touchpoints.student' : student.id})
                            
                            let commitsPromise = knex
                            .from('Commits')
                            .select('*')
                            .where({'Commits.student' : student.id})
                            
                            Promise.all([touchpointsPromse, commitsPromise])
                            .then(([touchpoints, commits]) => {
                                student.touchpoints = touchpoints
                                student.commits = commits
                                resolve(student)
                            })
                        })

                        studentPromises.push(studentPromise)
                    })
                    return Promise.all(studentPromises)
                    .then(students => {
                        cohort.students = students
                        return cohort
                    })
                })
                cohortPromises.push(cohortPromise)
            })
            return Promise.all(cohortPromises)
        })

        // .join('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        // .join('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        // .select('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.slug')
    },

    getCohortIdFromSlug : function(cohortSlug) {
        return knex
        .from('Cohorts')
        .select('Cohorts.id')
        .where({'Cohorts.slug' : cohortSlug})
        .then(rows => {
            let cohort = rows[0]
            if (cohort) {
                return cohort.id
            } else {
                return null
            }
        })
    },

    getCohortsByUser : function(userId) {
        return knex
        .from('Users')
        .join('LinkCohortsUsers', 'Users.id', '=', 'LinkCohortsUsers.user')
        .join('Cohorts', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .select('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.slug', knex.raw('COUNT("LinkCohortsStudents".student) as "numStudents" '))
        .groupBy('Cohorts.id')
        .where({'LinkCohortsUsers.user' : userId})
    },

    getCohortsList : function() {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        // .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .select('Cohorts.id', 'Cohorts.name', 'Cohorts.startDate', 'Cohorts.graduated', 'Cohorts.slug', knex.raw('COUNT("LinkCohortsStudents".cohort) as "numStudents"'))
        .groupBy('Cohorts.id')
    },

    getCohortStudents : function(cohortId) {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .where({'Cohorts.id' : cohortId})
    },

    getCohortStudentsAndStatus : function(cohortId) {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .leftJoin('Students', 'LinkCohortsStudents.student', '=', 'Students.id')
        .leftOuterJoin('Touchpoints AS tp', knex.raw('(SELECT MAX(ctime) FROM "Touchpoints" WHERE "Touchpoints".student="Students".id)'), '=', "tp.ctime")
        .leftJoin('Users', 'tp.user', '=', 'Users.id')
        .select('Students.id as studentId', 'tp.id as touchpointId', 'tp.ctime as touchpointCreated', 'LinkCohortsStudents.enrolledStatus', 'Students.*', 'tp.*', 'Users.firstName as userFirstName', 'Users.lastName as userLastName')
        .groupBy('Students.id', 'tp.id', 'Users.firstName', 'Users.lastName', 'LinkCohortsStudents.enrolledStatus')
        .where({'Cohorts.id' : cohortId})
        .then(rows => {
            if (rows[0].studentId === null) {return null}

            rows.forEach(row => {
                row.timeSinceTouchpoint = timeSinceTouchpoint(row.touchpointCreated)
            })

            return rows
        })
    },

    getCohortInstructors : function(cohortId) {
        return knex
        .from('Cohorts')
        .join('LinkCohortsUsers', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .join('Users', 'LinkCohortsUsers.user', '=', 'Users.id')
        .select('Users.*', 'LinkCohortsUsers.role')
        .where({'Cohorts.id' : cohortId})
    },

    getCohortInfo : function(cohortId) {
        return knex
        .from('Cohorts')
        .leftJoin('LinkCohortsStudents', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .select('Cohorts.id', 'Cohorts.*', knex.raw('COUNT("LinkCohortsStudents".cohort) as "numStudents"'))
        .groupBy('Cohorts.id')
        .where({'Cohorts.id' : cohortId})
    },

    addCohort : function(params) {
        let user = params.user
        delete params.user // User goes in the LinkUsersCohorts table, so we do not pass that param

        return knex
        .returning('*')
        .insert(params)
        .into('Cohorts')
        .then(cohortDataRows => {
            let cohortData = cohortDataRows[0]
            return knex
            .returning('*')
            .insert({
                "cohort" : cohortData.id,
                "user" : user,
                "role" : "admin"
            })
            .into('LinkCohortsUsers')
            .then(LinkCohortUsersDataRows => {
                let LinkCohortUsersData = LinkCohortUsersDataRows[0]
                cohortData.instructors = {
                    "cohort": LinkCohortUsersData.cohort, 
                    "user" : user, 
                    "role" : LinkCohortUsersData.role
                }
                return cohortData
            })
        })
        .catch(err => {
            console.log('DB error adding cohort - ', err)
        })
    },

    // ***** ASSIGNMENT METHODS *****

    getTouchpoint(userId, touchpointId) {
        return knex
        .from('Touchpoints')
        .join('Students.id', '=', 'Touchpoints.student')
        .join('LinkCohortsStudents.student', '=', 'Students.id')
        .join('Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .join('LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .select('LinkCohortsUsers.user as cohortUserId', 'Touchpoints.*')
        .where({
            'cohortUserId' : userId,
            'Touchpoints.id' : touchpointId
        })
    },

    getTouchpointsByStudent(userId, studentId) {
        return knex
        .from('Touchpoints')
        .join('Students', 'Students.id', '=', 'Touchpoints.student')
        .join('LinkCohortsStudents', 'LinkCohortsStudents.student', '=', 'Students.id')
        .join('Cohorts', 'Cohorts.id', '=', 'LinkCohortsStudents.cohort')
        .join('LinkCohortsUsers', 'LinkCohortsUsers.cohort', '=', 'Cohorts.id')
        .select('LinkCohortsUsers.user as cohortUserId', 'Students.id as studentId', 'Touchpoints.*')
        .where({
            'LinkCohortsUsers.user' : userId,
            'Students.id' : studentId
        })
    },

    getTouchpointsByUser(userId) {
        return knex
        .from('Touchpoints')
        .select('*')
        .where({
            'Touchpoints.user' : userId
        })
    },

    addTouchpoint(params) {

        return knex
        .returning('*')
        .insert(params)
        .into('Touchpoints')
        .then(rows => {
            return rows[0]
        })
        .catch(err => {
            console.log('error adding touchpoint - ', err)
        })
    },

    // ************ COMMIT METHODS ***************
    addCommits(commitsArray) {
        return knex
        .returning('*')
        .insert(commitsArray)
        .into('Commits')
        .catch(err => {
            console.log('error adding commits array - ', err)
        })
    },

    getCommitsByStudent(studentId) {
        return knex
        .from('Commits')
        .select('*')
        .where({
            'student' : studentId
        })
    }

}

function timeSinceTouchpoint(date) {
    if (!date) {
        return ''
    }
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

module.exports = db;