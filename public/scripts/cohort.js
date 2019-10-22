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

})