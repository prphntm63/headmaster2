$(document).ready(() => {
    $('#addCohortModalButton').on('click', openAddCohortModal)

})

function navigateTo(url) {
    window.location.href = url
}

function submitCohortForm(cohortData) {
    fetch('/api/cohorts', {
        method: 'POST',
        body: JSON.stringify(cohortData),
        headers: {
            'Content-Type': 'application/json'
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
        window.alert('Cohort added!')
        $('#addCohortModal').modal('hide')
    })
    .catch(err => {
        if (err.status === 400) {
            err.json()
                .then(responseJson => {
                    console.log(responseJson)
                    window.alert(`Cohort failed to add! \n${responseJson.errors.map(error => { return error.field + ': ' + error.error + '\n' }).join('')}`)
                })
        } else {
            console.log('you dun fucked up')
            window.alert('Server error')
        }

    })
}

function openAddCohortModal() {
    $('#submitAddCohortModal').on('click', validateCohortForm)

    $('#addCohortModal').modal('show')
}

function getCohortsFromDb() {
    return fetch('/api/cohorts')
        .then(cohorts => {
            return cohorts.json()
        })
        .then(cohortsJson => {
            let cohortList = []
            cohortsJson.forEach(cohortJson => {
                cohortList.push(cohortJson.cohort)
            })
            return cohortList
        })
}

async function validateCohortForm() {
    let valid = true;

    getCohortsFromDb()
        .then(existingCohorts => {
            let formData = {
                "cohortName": $('#cohortName').val(),
                "startDate": $('#startDate').val(),
                "cohortSlug" : $('#cohortSlug').val(),
            }

            for (key in formData) {
                $(`#${key}`).removeClass('is-invalid is-valid')

                if (!$(`#${key}`).val()) {
                    $(`#${key}`).addClass('is-invalid')
                    $(`#${key}Feedback`).text('Cannot be blank')
                    valid = false;
                } else if (key === "cohortName" && existingCohorts.find(cohortName => { return cohortName == formData[key] })) {
                    $(`#${key}`).addClass('is-invalid')
                    $(`#${key}Feedback`).text('Cohort already exists!')
                    valid = false
                } else {
                    $(`#${key}`).addClass('is-valid')
                }
            }

            if (valid) {
                submitCohortForm(formData)
            }
        })
}