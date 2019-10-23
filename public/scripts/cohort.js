$(document).ready(() => {

    $('.add-student-button').on('click', (evt) => {
        evt.preventDefault()
        getCohortsFromDb()
    })

    $('.add-touchpoint-button').click((evt) => {
        evt.stopPropagation()
        evt.preventDefault()
        let studentId = $(evt.target).closest('.student-card').data('student-id')
        $('#studentModalTags').html('')
        $('#newTouchpointStudentId').val('')
        getLatestTouchpointFromDb(studentId)
    })

    $('#addInstructorButton').on('click', function(evt) {
        let cohortSlug = $(evt.target).data('cohort-slug')
        $('#cohortSlug').val(cohortSlug)
        showAddInstructorToCohortModal(evt)
    })

})