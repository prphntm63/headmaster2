$(document).ready(() => {
    if(performance.navigation.type == 2){
        location.reload(true);
    }

    $('#github').blur(function() {
        let githubUsername = $('#github').val()
    
        if (githubUsername) {
            checkGithubUser(githubUsername, true)
        }
    })

    $('#githubEdit').blur(function() {
        let githubUsername = $('#githubEdit').val()
    
        if (githubUsername) {
            checkGithubUserEdit(githubUsername, true)
        }
    })

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

    $('#sort-type').on('change', function(evt) {
        let sortValue = $('#sort-type').val()
        let upDown = $('#sortUp').prop('checked') ? 'up' : 'down'

        sortStudents('.student-card', sortValue, upDown)
    })

    $('#sortUp').on('change', function(evt) {
        let sortValue = $('#sort-type').val()
        let upDown = $('#sortUp').prop('checked') ? 'up' : 'down'

        sortStudents('.student-card', sortValue, upDown)
    })

    $('#sortDown').on('change', function(evt) {
        let sortValue = $('#sort-type').val()
        let upDown = $('#sortUp').prop('checked') ? 'up' : 'down'

        sortStudents('.student-card', sortValue, upDown)
    })

    $('.arrow-up-down').on('click', function(evt) {
        let upDown = 'up'
        if ($(evt.target).hasClass('ascending')) {
            upDown = 'down'
            $('.arrow-up-down').removeClass('ascending descending')
            $(evt.target).addClass('descending')
        } else if ($(evt.target).hasClass('descending')) {
            upDown = 'up'
            $('.arrow-up-down').removeClass('ascending descending')
            $(evt.target).addClass('ascending')
        } else {
            upDown = 'up'
            $('.arrow-up-down').removeClass('ascending descending')
            $(evt.target).addClass('ascending')
        }
        let parameter = $(evt.target).attr('id').slice(0, -10)

        sortStudents('.student-tab-list-item', parameter, upDown)
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

    $('.add-student-button').on('addStudentEvent', function(evt, updatedStudentData) {
        $('.student-list').append(
            `
            <div class="list-group-item list-group-item-action enrolledStatus" onclick="navigateTo('/students/${updatedStudentData.github}')">
                <div class="row">
                    <div class="col-sm-1 my-auto"></div>
                    <div class="col-sm-3 d-flex flex-row align-items-center student-info"><img class="mr-2" alt="/public/images/noPhoto.png" src="${updatedStudentData.photoUrl}" style="height:50px;" />
                        <h6>${updatedStudentData.firstName} ${updatedStudentData.lastName}</h6>
                    </div>
                    <div class="col-sm-2 my-auto student-github"><a class="d-flex flex-row align-items-center" href="https://github.com/"+${updatedStudentData.github}><img src="./public/images/GitHub-Mark.png" style="height:30px;"/><div>${updatedStudentData.github}</div></a></div>
                    <div class="col-sm-2 my-auto mx-auto"></div>
                    <div class="col-sm-2 my-auto"></div>
                    <div class="col-sm-offset d-flex flex-row-reverse my-auto mx-3"><button class="btn btn-primary edit-student-button" type="button" data-student-id="${updatedStudentData.studentId}">Edit...</button></div>
                </div>
            </div>
            `
        )

        $('.student-cards').append(
            `
            <div class="card student-card" data-student-id=${updatedStudentData.studentId} data-stoplight-status=null data-student-name=${updatedStudentData.firstName + ' ' + updatedStudentData.lastName} data-last-touchpoint=null>
                <div class="card-header d-flex flex-row linkstyle" onclick="navigateTo('/students/${updatedStudentData.github}')">
                    <div><img class="student-photo" alt="/public/images/noPhoto.png" src="${updatedStudentData.photoUrl}" /></div>
                    <div class="w-100">
                        <div class="d-flex flex-row justify-content-between stoplight-status-div">
                            <h4 class="mx-2 student-name text-truncate">${updatedStudentData.firstName + ' ' + updatedStudentData.lastName}</h4>
                        </div>
                        <div class="d-flex flex-row"><img class="ml-2" src="./../public/images/GitHub-Mark.png" style="height:25px;" /><a class="ml-1" href="https://github.com/${updatedStudentData.github}">${updatedStudentData.github}</a></div>
                    </div>
                </div>
                <div class="card-body d-flex flex-row student-info">
                    <div class="d-flex flex-column student-touchpoint">
                        <div class="student-touchpoint-title">Last Touchpoint</div>
                    </div>
                    <div class="d-flex flex-column student-commits">
                        <div class="student-touchpoint-title">Latest Commits</div>
                    </div>
                </div>
                <div class="card-footer d-flex flex-row student-card-footer p-0">
                    <div class="d-flex justify-content-center py-2" style="border-right:1px solid rgba(0,0,0,.125);"><a href="/students/${updatedStudentData.github}">Details</a></div>
                    <div class="d-flex justify-content-center py-2 add-touchpoint-button"><a href="href">Add Touchpoint</a></div>
                </div>
            </div>
            `
        )
    })

    $('[data-toggle="tooltip"]').tooltip();

})

function sortStudents(cssClass, parameter, order) {
    if (cssClass === undefined) return
    
    if (parameter === undefined) {
        parameter = 'student-firstname'
    }

    if (order === undefined) {
        order = 'up'
    }

    let elements = $(`${cssClass}`).sort(
            function(elem1, elem2) {
                let param1 = $(elem1).data(parameter)
                let param2 = $(elem2).data(parameter)
                if (param1 === undefined) {
                    if (order === 'up') {
                        return 1
                    } else {
                        return -1
                    }
                } else if (param2 === undefined) {
                    if (order === 'up') {
                        return -1
                    } else {
                        return 1
                    }
                }

                if (parameter === 'stoplight-status') {
                    // Remap colors to numbers for comparison
                    param1 = param1 === 'green' ? '1' :  (param1 === 'yellow' ? '2' : '3') 
                    param2 = param2 === 'green' ? '1' :  (param2 === 'yellow' ? '2' : '3') 
                }

                if (parameter === 'last-touchpoint' || parameter === 'last-commit') {
                    if (order === 'up') {
                        return param2.localeCompare(param1)
                    } else {
                        return param1.localeCompare(param2)
                    }
                    
                } else {
                    if (order === 'up') {
                        return param1.localeCompare(param2)
                    } else {
                        return param2.localeCompare(param1)
                    }
                }

            } 
        ).appendTo( $(`${cssClass}`).parent().eq(0) )

}

