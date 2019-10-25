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

    $('.student-card').on('addTouchpointEvent', function(evt, updatedTouchpointData) {
        let headerHtmlOut=''
        let infoHtmlOut =''

        if (updatedTouchpointData.stoplightStatus === 'green') {
            headerHtmlOut += 
            `<span class="badge badge-pill badge-success">
                <i class="material-icons pt-1 stoplight-badge">done</i>
            </span>`
        } else if (updatedTouchpointData.stoplightStatus === 'yellow') {
            headerHtmlOut += 
            `<span class="badge badge-pill badge-warning">
                <i class="material-icons pt-1 stoplight-badge">help_outline</i>
            </span>`
        } else if (updatedTouchpointData.stoplightStatus === 'red') {
            headerHtmlOut += 
            `<span class="badge badge-pill badge-danger">
                <i class="material-icons pt-1">warning</i>
            </span>`
        }
        
        if (updatedTouchpointData.comment) {
            infoHtmlOut += '<div class="student-touchpoint-comment"><small>'+updatedTouchpointData.comment+'</small></div>'
        }

        if (updatedTouchpointData.tags) {
            updatedTouchpointData.tags.forEach(tag => {
                if (tag.status === 'green') {
                    infoHtmlOut += '<span class="badge badge-success mr-auto my-1">'+tag.text+'</span>'
                } else if (tag.status === 'yellow') {
                    infoHtmlOut += '<span class="badge badge-warning mr-auto my-1">'+tag.text+'</span>'
                } else if (tag.status === 'red') {
                    infoHtmlOut += '<span class="badge badge-danger mr-auto my-1">'+tag.text+'</span>'
                }
            })
        }

        infoHtmlOut += '<div class="blockquote-footer touchpoint-date> 1 second ago by '+updatedTouchpointData.user

        $(evt.target).find('.student-touchpoint').html(infoHtmlOut)
        $(evt.target).find('.stoplight-status-div').find('span').remove()
        $(evt.target).find('.stoplight-status-div').append(headerHtmlOut)
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

// .student-touchpoint-title Last Touchpoint
//     if student.comment
//         .student-touchpoint-comment
//             small #{student.comment}
//     if student.tags
//         each tag in student.tags
//             if tag.status === 'green'
//                 span.badge.badge-success.mr-auto.my-1 #{tag.text}
//             else if tag.status === 'yellow'
//                 span.badge.badge-warning.mr-auto.my-1 #{tag.text}
//             else if tag.status ==='red'
//                 span.badge.badge-danger.mr-auto.my-1 #{tag.text}
//     if student.timeSinceTouchpoint
//         .blockquote-footer.touchpoint-date #{student.timeSinceTouchpoint} ago by #{student.userFirstName} #{student.userLastName}