$(document).ready(() => {
    if(performance.navigation.type == 2){
        location.reload(true);
    }

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

    $('.edit-student-button').on('click', function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        editStudent(evt)
    })

    $('.edit-student-button').on('editStudentEvent', function(evt, updatedStudentData) {
        if ($(evt.target).data('student-id') != updatedStudentData.id) return
        console.log($(evt.target).data('student-id'), updatedStudentData)

        $(evt.target).parent().siblings('.student-info').html(
            `
                <img class="mr-2" alt="/public/images/noPhoto.png" src=${updatedStudentData.photoUrl} style="height:50px" />
                <h6>${updatedStudentData.firstName} ${updatedStudentData.lastName}</h6>
            `
        )

        $(evt.target).parent().siblings('.github-info').html(
            `
            <div class="col-sm-2 my-auto">
                <a class="d-flex flex-row align-items-center" href="https://github.com/${updatedStudentData.github}"><img src="./public/images/GitHub-Mark.png" style="height:30px" />${updatedStudentData.github}</a>
            </div>
            `
        )

        $(evt.target).closest('.list-group-item').attr('onclick', `navigateTo("/students/${updatedStudentData.github}")`)
        
        if (!updatedStudentData.enrolledStatus) {
            $(evt.target).closest('.list-group-item').addClass('list-group-item-secondary')
        } else {
            $(evt.target).closest('.list-group-item').removeClass('list-group-item-secondary')
        }
    })

    $('[data-toggle="tooltip"]').tooltip();

})

{/* <div class="row">
<div class="col-sm-1 my-auto">
    "Stoplight Status"
</div>
<div class="col-sm-3 d-flex flex-row align-items-center">
    <img class="mr-2" alt="/public/images/noPhoto.png" src="photoSource" style="height:50px" />
    <h6>Name</h6>
</div>
<div class="col-sm-2 my-auto">
    <a class="d-flex flex-row align-items-center" href="https://github.com/student.github"><img src="./public/images/GitHub-Mark.png" style="height:30px" />studentGithub</a>
</div>
<div class="col-sm-2 my-auto mx-auto">
    LastCommit
</div>
<div class="col-sm-2 my-auto">

</div>
<div class="col-sm-offset d-flex flex-row-reverse my-auto mx-3">
    <button class="btn btn-primary" id="edit-student" type="button" data-student-id="student.studentId">Edit...</button>
</div>
</div> */}