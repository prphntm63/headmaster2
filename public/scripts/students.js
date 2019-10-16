function navigateTo(url) {
    window.location.href = url
}

function submitStudentForm(studentData) {
    fetch('/students', {
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
        console.log(responseJson)
        window.alert('Student added!')
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

function getCohortsFromDb() {
    fetch('/api/cohorts')
    .then(cohorts => {
        return cohorts.json()
    })
    .then(cohortsJson => {
        cohortsJson.forEach(cohortJson => {
            $('#cohort').append($('<option>', {"value":cohortJson.id, "text":cohortJson.cohortName}))
        })
        $('#addStudentModal').modal('show')
    })
}

function validateStudentForm() {
    let valid = true;

    let formData = {
        firstName : $('#firstName').val(),
        lastName : $('#lastName').val(),
        cohort : $('#cohort').val(),
        github : $('#github').val()
    }

    for (key in formData) {
        $(`#${key}`).removeClass('is-invalid is-valid')

        if ( !$(`#${key}`).val() ) {
            $(`#${key}`).addClass('is-invalid')
            valid = false;
        } else (
            $(`#${key}`).addClass('is-valid')
        )
    }

    if (valid) {
        submitStudentForm(formData)
    }
}