function showAddInstructorToCohortModal(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    $('#instructorId').html('')

    fetch('/api/instructors')
    .then(instructors => {
        return instructors.json()
    })
    .then(instructorsJson => {
        instructorsJson.forEach(instructor => {
            $('#instructorId').append($('<option>', {"value":instructor.id, "text":instructor.firstName+' '+instructor.lastName}))
        })
        $('#addInstructorToCohortModal').modal('show')
        $('#submitAddInstructorToCohortModal').on('click', validateAddInstructorToCohort)
    })
}

function validateAddInstructorToCohort(evt) {
    evt.preventDefault()
    evt.stopPropagation()

    let submitParams = {
        "user" : $('#instructorId').val(),
        "cohort" : $('#cohortSlug').val(),
        "role" : $('#instructorRole').val()
    }

    fetch('/api/cohorts')
}