function editStudent(evt) {
    evt.preventDefault()
    let studentId = $(evt.target).data('student-id')
    console.log(studentId)

    Promise.all([getStudentFromDbEdit(studentId), getCohortsFromDbEdit()])
    .then(([studentInfoJson, cohortsJson]) => {
        $('#firstNameEdit').val(studentInfoJson.firstName ? studentInfoJson.firstName : '')
        $('#lastNameEdit').val(studentInfoJson.lastName ? studentInfoJson.lastName : '')
        $('#githubEdit').val(studentInfoJson.github ? studentInfoJson.github : '')
        $('#profilePicLoadEdit').html(`
            <div style="display:flex; flex-direction:row; justify-content:center; align-items:center">
                <img src=${studentInfoJson.photoUrl} style="height:60px;width:60px;" />
            </div>
        `)
        $('#enrolledStatusEdit').prop('checked', studentInfoJson.enrolledStatus)
        cohortsJson.forEach(cohort => {
            $('#cohortEdit').append($('<option>', {"value":cohort.id, "text":cohort.name}))
        })
        $('#cohortEdit').val(studentInfoJson.cohortId ? studentInfoJson.cohortId : '')
        $('#editStudentModal').modal('show')
        $('#editStudentModalSubmit').on('click', function(studentInfoJson, evt) {
            validateEditStudentForm(studentInfoJson.id)
        }.bind($('#editStudentModalSubmit'), studentInfoJson))
    })



    console.log('Editing Student', studentId)
}

function checkGithubUserEdit(githubUsername, populateFields) {
    if (populateFields === undefined) {
        populateFields = false;
    }

    $(`#githubEdit`).removeClass('is-invalid is-valid')

    return fetch('/api/github/'+githubUsername)
    .then(response => {
        return response.json()
    })
    .then(responseJSON => {
        if (responseJSON != null) {
            $('#githubEdit').addClass('is-invalid')
            $('#githubEditUsernameFeedback').text(`${githubUsername} is already retgistered as a ${responseJSON.type}`)
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
                    $('#githubEdit').addClass('is-invalid')
                    $('#githubEditUsernameFeedback').text(`${githubUsername} is not a valid Github username`)
                    $('#photoUrlEdit').val('')
                    $('#firstNameEdit').val('')
                    $(`#firstNameEdit`).removeClass('is-invalid is-valid')
                    $('#lastNameEdit').val('')
                    $(`#lastNameEdit`).removeClass('is-invalid is-valid')
                    $('#profilePicLoadEdit').html('')
                    return false
                } else if (responseJSON.name) {
                    firstName = responseJSON.name.split(' ').slice(0,1)
                    lastName = responseJSON.name.split(' ').slice(1).join(' ')
                }


                if (populateFields) {
                    $('#github').addClass('is-valid')
                    if (firstName) {
                        $('#firstNameEdit').val(firstName)
                        $('#firstNameEdit').addClass('is-valid')
                    }
                    
                    if (lastName) {
                        $('#lastNameEdit').val(lastName)
                        $('#lastNameEdit').addClass('is-valid')
                    }

                    if (photoUrl) {
                        $('#photoUrlEdit').val(photoUrl)
                        $('#profilePicLoadEdit').html(`
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


function getStudentFromDbEdit(studentId) {
    return fetch('/api/students/'+studentId)
    .then(studentInfo => {
        return studentInfo.json()
    })
    .then(studentInfoJson => {
        if (!studentInfoJson) {throw 'No Student Found!!'}

        return studentInfoJson
    })
    .catch(err => {
        console.log(err)
    })
}

function getCohortsFromDbEdit() {
    return fetch('/api/cohorts')
    .then(cohorts => {
        return cohorts.json()
    })
    .catch(err => {
        console.log(err)
    })
}

function validateEditStudentForm(studentId) {
    let errors = [];
    let studentData = {
        "id" : studentId,
        "firstName" : $('#firstNameEdit').val(),
        "lastName" : $('#lastNameEdit').val(),
        "cohort" : $('#cohortEdit').val(),
        "github" : $('#githubEdit').val(),
        "photoUrl" : $('#photoUrlEdit').val(),
        "enrolledStatus" : $('#enrolledStatusEdit').is(':checked'),
    }

    // Add validation checking here and push mistakes to errors[]

    checkGithubUserEdit(studentData.github, false)
    .then(githubValid => {
        if (!errors.length && githubValid) {
            submitEditStudentForm(studentData)
        }
    })
}

function submitEditStudentForm(studentData) {
    return fetch('/api/students/'+studentData.id, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(studentData)
    })
    .then(returnData => {
        if (returnData.status === 200) {
            return returnData.json()
        } else if (returnData.status === 400) {
            let errors = returnData.json()
            window.alert('Validation Errors', errors)
        } else {
            window.alert('server error')
        }
            
    })
    .then(returnJSON => {
        console.log(returnJSON)
        // let editStudentEvent = new CustomEvent('editStudentComplete', {
        //     detail: {
        //         "updatedStudentData" : returnJSON
        //     }
        // })

        $('.edit-student-button').filter(function(idx, elem) {return $(elem).data('student-id') === returnJSON.id}).trigger("editStudentEvent", [returnJSON])
        // $('.edit-student-button').data(`student-id:contains(${studentData.id})`).trigger("editStudentEvent", [returnJSON])
        $('#editStudentModal').modal('hide')
    })
}