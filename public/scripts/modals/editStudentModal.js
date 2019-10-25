function editStudent(evt) {
    evt.preventDefault()
    let studentId = $(evt.target).data('student-id')
    console.log(studentId)

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
        $('#editStudentModalSubmit').on('click', function(studentInfoJson, evt) {
            validateEditStudentForm(studentInfoJson.id)
        }.bind($('#editStudentModalSubmit'), studentInfoJson))
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

function validateEditStudentForm(studentId) {
    let errors = [];
    let studentData = {
        "id" : studentId,
        "firstName" : $('#firstNameEdit').val(),
        "lastName" : $('#lastNameEdit').val(),
        "cohort" : $('#cohortEdit').val(),
        "github" : $('#githubEdit').val(),
        "enrolledStatus" : $('#enrolledStatusEdit').is(':checked'),
    }

    console.log(studentData)

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