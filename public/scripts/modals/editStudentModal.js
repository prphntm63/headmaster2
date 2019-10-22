function editStudent(evt) {
    evt.preventDefault()
    let studentId = $('#edit-student').data('student-id')

    Promise.all([getStudentFromDbEdit(studentId), getCohortsFromDbEdit()])
    .then(([studentInfoJson, cohortsJson]) => {
        $('#firstNameEdit').val(studentInfoJson.firstName ? studentInfoJson.firstName : '')
        $('#lastNameEdit').val(studentInfoJson.lastName ? studentInfoJson.lastName : '')
        $('#githubEdit').val(studentInfoJson.github ? studentInfoJson.github : '')
        $('#enrolledStatusEdit').prop('checked', studentInfoJson.enrolledStatus)
        cohortsJson.forEach(cohort => {
            $('#cohortEdit').append($('<option>', {"value":cohort.id, "text":cohort.name}))
        })
        $('#cohortEdit').val(studentInfoJson.cohortId ? studentInfoJson.cohortId : '')
        $('#editStudentModal').modal('show')
        $('#editStudentModalSubmit').on('click', validateEditStudentForm)
    })

    console.log('Editing Student', studentId)
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

function validateEditStudentForm() {
    let errors = [];
    let studentData = {
        "id" : $('#edit-student').data('student-id'),
        "firstName" : $('#firstNameEdit').val(),
        "lastName" : $('#lastNameEdit').val(),
        "cohort" : $('#cohortEdit').val(),
        "github" : $('#githubEdit').val(),
        "enrolledStatus" : $('#enrolledStatusEdit').is(':checked'),
    }

    // Add validation checking here and push mistakes to errors[]

    if (!errors.length) {
        submitEditStudentForm(studentData)
    }
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
    })
}