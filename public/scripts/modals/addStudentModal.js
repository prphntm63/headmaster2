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
    })
    .catch(err => {
        console.log(err)
    })
}

function validateStudentForm() {
    let valid = true;

    let formData = {
        firstName : $('#firstName').val(),
        lastName : $('#lastName').val(),
        cohort : $('#cohort').val(),
        github : $('#github').val(),
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

    if (valid) {
        submitStudentForm(formData)
    }
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