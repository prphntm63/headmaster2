function getLatestTouchpointFromDb(studentId) {
    fetch(`/api/students/${studentId}`)
    .then(studentData => {
        return studentData.json()
    })
    .then(studentJson => {
        let previousTags = studentJson.tags
        addExistingTagsToTouchpointModal(previousTags)

        $('#newTouchpointStudentId').val(studentId)
        $('#newTouchpointTagSubmit').click(addNewTagToTouchpointModal)
        $('#addTouchpointSubmit').click(validateTouchpoint)
    })

    $('#addTouchpointModal').modal('show')
}

function getBadgeClassFromStatus(status) {
    let badgeClass = ''
            switch (status) {
                case 'green':
                    badgeClass = 'success'
                    break;
                case 'yellow':
                    badgeClass = 'warning'
                    break;
                case 'red':
                    badgeClass = 'danger'
                    break;
                default:
                    badgeClass = 'success'
            }
    return badgeClass
}

function addExistingTagsToTouchpointModal(tags) {
    if (!tags) return
    tags.forEach(tag => {
        let badgeClass = getBadgeClassFromStatus(tag.status)
        $('#studentModalTags').append(`
            <span class="badge badge-${badgeClass} mr-auto my-1" data-tag-status="${tag.status}">${tag.text} <span class="delete-tag linkstyle"><i class="material-icons">cancel</i></span></span>
        `)
    })
    $('.delete-tag').click(function(evt) {
        $(this).closest('.badge').remove()
    })
}

function addNewTagToTouchpointModal(evt) {
    evt.preventDefault()            
    evt.stopPropagation()
    let newTagStatus = $('#newTouchpointTagStatus').val()
    let newTagText = $('#newTouchpointTag').val()

    if (!newTagStatus || !newTagText) return

    let badgeClass = getBadgeClassFromStatus(newTagStatus)
    $('#studentModalTags').append(`
        <span class="badge badge-${badgeClass} mr-auto my-1" data-tag-status="${newTagStatus}">${newTagText} <span class="delete-tag linkstyle"><i class="material-icons">cancel</i></span></span>
    `)
    $('.delete-tag').click(function(evt) {
        $(this).closest('.badge').remove()
    })
}

function validateTouchpoint(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    let errors = []

    let modalTags = []
    $('#studentModalTags').children('span').each(function(index) {
        let tagStatus = $(this).data('tag-status')
        let tagText = $(this).clone().children().remove().end().text()
        modalTags.push({
            "status" : tagStatus,
            "text" : tagText
        })
    })
    let stoplightStatus = $('.stoplightStatus').children('.active').children('input').val()
    let comment = $('#newTouchPointComment').val()
    let sendData = {
        'ctime' : new Date(),
        'student' : $('#newTouchpointStudentId').val(),
        'stoplightStatus' : stoplightStatus,
        'tags' : JSON.stringify(modalTags),
        'comment' : comment
    }

    if (!errors.length) {
        fetch('/api/touchpoints', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(sendData)
        })
        .then(returnData => {
            return returnData.json()
        })
        .then(returnJson => {
            console.log(returnJson)
            $('#addTouchpointModal').modal('hide')
        })
    }
}
