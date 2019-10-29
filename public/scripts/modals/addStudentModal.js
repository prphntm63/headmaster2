function getCohortsFromDb() {
    fetch('/api/cohorts')
    .then(cohorts => {
        return cohorts.json()
    })
    .then(cohortsJson => {
        cohortsJson.forEach(cohort => {
            $('#cohort').append($('<option>', {"value":cohort.id, "text":cohort.name}))
        })
        $('#addStudentModal').modal('show')
        $('#cohort').val( $('.add-student-button').data('cohort-id') )
    })
    .catch(err => {
        console.log(err)
    })
}

function checkGithubUser(githubUsername, populateFields) {
    if (populateFields === undefined) {
        populateFields = false;
    }

    $(`#github`).removeClass('is-invalid is-valid')
    $('#profilePicLoad').html('')

    return fetch('/api/github/'+githubUsername)
    .then(response => {
        return response.json()
    })
    .then(responseJSON => {
        if (responseJSON != null) {
            $('#github').addClass('is-invalid')
            $('#githubUsernameFeedback').text(`${githubUsername} is already retgistered as a ${responseJSON.type}`)
        } else {
            return fetch('https://api.github.com/users/'+githubUsername)
            .then(response => {
                return response.json()
            })
            .then(responseJSON => {
                let firstName = null;
                let lastName = null;
                let photoUrl = null;

                if (responseJSON.avatar_url) {
                    photoUrl = responseJSON.avatar_url
                }
                
                if (!responseJSON.login) {
                    $('#github').addClass('is-invalid')
                    $('#githubUsernameFeedback').text(`${githubUsername} is not a valid Github username`)
                    $('#photoUrl').val('')
                    $('#firstName').val('')
                    $(`#firstName`).removeClass('is-invalid is-valid')
                    $('#lastName').val('')
                    $(`#lastName`).removeClass('is-invalid is-valid')
                    $('#profilePicLoad').html('')
                    return false
                } else if (responseJSON.name) {
                    firstName = responseJSON.name.split(' ').slice(0,1)
                    lastName = responseJSON.name.split(' ').slice(1).join(' ')
                }

                if (populateFields) {
                    $('#github').addClass('is-valid')
                    if (firstName) {
                        $('#firstName').val(firstName)
                        $('#firstName').addClass('is-valid')
                    }
                    
                    if (lastName) {
                        $('#lastName').val(lastName)
                        $('#lastName').addClass('is-valid')
                    }

                    if (photoUrl) {
                        $('#photoUrl').val(photoUrl)
                        $('#profilePicLoad').html(`
                            <div style="display:flex; flex-direction:row; justify-content:center; align-items:center">
                                <img src=${responseJSON.avatar_url} style="height:60px;width:60px;" />
                            </div>
                        `)
                    }

                    return true
                } else {
                    return true
                }
            })
        }
    })
    .catch(err => {
        if (err.status != '404') {
            console.log('error with github API call - ', err)
        }
    })

    
}

function validateStudentForm() {
    let valid = true;

    let formData = {
        firstName : $('#firstName').val(),
        lastName : $('#lastName').val(),
        cohort : $('#cohort').val(),
        github : $('#github').val(),
        photoUrl : $('#photoUrl').val(),
        enrolledStatus : $('#enrolledStatus').is(':checked')
    }

    console.log(formData)

    for (key in formData) {
        $(`#${key}`).removeClass('is-invalid is-valid')

        if (key === enrolledStatus) {
            $(`#${key}`).addClass('is-valid')
        } else if( !$(`#${key}`).val() ) {
            $(`#${key}`).addClass('is-invalid')
            valid = false;
        } else (
            $(`#${key}`).addClass('is-valid')
        )
    }

    checkGithubUser(formData.github, false)
    .then(githubValid => {
        if (valid && githubValid) {
            submitStudentForm(formData)
        }
    })
}

function submitStudentForm(studentData) {
    fetch('/api/students', {
        method: 'POST',
        body: JSON.stringify(studentData),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log('success')
            return response.json()
        } else throw response
    })
    .then(responseJson => {
        window.alert('Student added!')
        $('.add-student-button').trigger("addStudentEvent", [responseJson])
        $('#addStudentModal').modal('hide')
    })
    .catch(err => {
        if (err.status === 400) {
            err.json()
            .then(responseJson => {
                console.log(responseJson)
                window.alert(`Student failed to add! \n${responseJson.errors.map(error => {return error.field + ': ' + error.error + '\n'}).join('')}`)
            })
        } else {
            console.log('you dun fucked up')
            window.alert('Server error')
        }   

    })
}