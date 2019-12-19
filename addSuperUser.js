const db = require ('./db');
const fetch = require('node-fetch');

const githubUsername = process.env.npm_config_github || null
const role = process.env.npm_config_role || 'user'

if (!githubUsername) {
    console.error('Github username required! Use the flag --github={your_github_username} when executing to set the username you want added.')
    process.exit()
}

if (!process.env.npm_config_role) {
    console.warn('User role not specified. Defaulting to user. To set a higher role use the flag --role={user -OR- admin -OR- superadmin} when executing')
}

console.log(`Adding Superuser ${githubUsername} as ${role}`)

return fetch('https://api.github.com/users/'+githubUsername)
.then(response => {
    return response.json()
})
.then(responseJSON => {
    let userData = {
        github : githubUsername,
        superuser : role
    }

    if(!responseJSON.login) {
       console.error(`Github username ${githubUsername} does not exist!`)
       process.exit()
    }

    if (responseJSON.avatar_url) {
        userData.photoUrl = responseJSON.avatar_url
    }
    
    if (responseJSON.name) {
        userData.firstName = responseJSON.name.split(' ').slice(0,1)[0]
        userData.lastName = responseJSON.name.split(' ').slice(1).join(' ')
    }

    return userData
})
.then(userData => {
    return db.getUserIdFromGithub(userData.github)
    .then(userId => {
        if (userId) {
            return db.updateUser(userId, userData)
        } else {
            return db.createUser(userData)
        }
    })
    .then(() => {
        return userData
    })

})
.then(returnUserData => {
    console.info(`Github User ${returnUserData.github} added as a ${returnUserData.superuser}`)
    process.exit()
})
.catch(err => {
    console.error(err)
    process.exit()
})

// table.string('firstName');
// table.string('lastName');
// table.string('photoUrl');
// table.string('github');
// table.unique('github');
// table.string('accessToken');
// table.string('refreshToken');
// table.enu('superuser', ['user', 'admin', 'superadmin']).defaultsTo('user')