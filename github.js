// External API calls (mostly) to Github

let secretParams = '?client_id=f557b8f71bf0a32f69d4&client_secret=e421378ff7af880612d7c11fd23778a6fbab90ed'

// api.github.com/users/prphntm/events
// can get commit info thru GET api.github.com/repos/:owner/:repo/commits/:ref

const fetch = require('node-fetch');

let github = {

    getUser : function(username) {
        return fetch('https://api.github.com/users/'+username+secretParams)
        .then(response => {
            if (response.status != 200) {
                if (response.status === 403) {
                    throw 'Github API limit exceeded' 
                } else {
                    throw 'Github error - status code ' + response.status
                }
            }
            return response.json()
        })
        .catch(err => {
            console.log('error getting github user - ', err)
        })
    },

    getUserCommits : function(username, fetchPeriod) {
        if (fetchPeriod === undefined) {
            fetchPeriod = 48*60*60*1000; //milliseconds; default to 48 hours
        }

        // Check API limit (does not count against API calls limit)
        fetch('https://api.github.com/rate_limit'+secretParams)
        .then(response => {
            return response.json()
        })
        .then(res => {
            console.log(res)
        })

        let dateNow = new Date().getTime()
        let eventPromises = []

        for (let page=1; page<=1; page++) { // Note: can change this up to 10. Just 1 right now to preserve API calls
            eventPromises.push( 
                fetch('https://api.github.com/users/'+username+'/events'+secretParams)
                .then(response => {
                    if (response.status != 200) {
                        if (response.status === 403) {
                            throw 'Github API limit exceeded' 
                        } else {
                            throw 'Github error - status code ' + response.status
                        }
                    }
                    return response.json()
                })
            )
        }
        
        return Promise.all(eventPromises)
        .then(eventPages => {
            return flatDeep(eventPages)
        })
        .then(events => {
            let commitPromises = []
            let commitHashes = []

            events.forEach(event => {
                //We only want push events
                if (event.type != "PushEvent") return 

                //Check to see if we are within desired range
                let createdDate = new Date(event.created_at)
                if (dateNow - createdDate.getTime() > fetchPeriod) return 

                // make API call for each commit
                event.payload.commits.forEach(commit => {
                    // Kill duplicates
                    if (commitHashes.find(existingCommit => {return existingCommit === commit.sha})) {
                        return
                    } else {
                        commitHashes.push(commit.sha)
                    }

                    commitPromises.push(
                        fetch(commit.url+secretParams)
                        .then(response => {
                            if (response.status != 200) {
                                if (response.status === 403) {
                                    throw 'Github API limit exceeded' 
                                } else {
                                    throw 'Github error - status code ' + response.status
                                }
                            }
                            return response.json()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    )
                })

            })

            // Parse info from each commit
            return Promise.all(commitPromises)
            .then(commitsArray => {
                let commitsOutArray = []

                commitsArray.forEach(commit => {
                    // Make sure we are only logging commits for our user
                    if (commit.author.login != username) return
                    let outFiles = []

                    // OH hellz yeah we be trackin files too!
                    commit.files.forEach(file => {
                        outFiles.push({
                            "filename" : file.filename.split('/').slice(-1)[0],
                            "additions" : file.additions,
                            "deletions" : file.deletions,
                            "changes" : file.changes
                        })
                    })

                    let commitData = {
                        "ctime" : commit.commit.date,
                        "sha" : commit.sha,
                        "message" : commit.commit.message,
                        "repo" : commit.commit.url.split('/')[5],
                        "total" : commit.stats.total,
                        "added" : commit.stats.additions,
                        "deleted" : commit.stats.deletions,
                        "files" : JSON.stringify(outFiles),
                    }
                    commitsOutArray.push(commitData)
                })

                return commitsOutArray
            })
        })

    },

    getCommit : function(params) {
        return fetch(`https://api.github.com/repos/${params.github}/${params.repo}/commits/${params.sha}${secretParams}`)
        .then(response => {
            if (response.status != 200) {
                if (response.status === 403) {
                    throw 'Github API limit exceeded' 
                } else {
                    throw 'Github error - status code ' + response.status
                }
            }
            return response.json()
        })
    },
}

// Since Node doesn't support flat() function yet
function flatDeep(arr) {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
};

module.exports = github;

// console.log('starting')

// // Test function
// github.getUserCommits('prphntm63')
// .then(commits => {
//     console.log(commits)
// })