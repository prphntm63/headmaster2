import {
    COHORT_SORT_FILTERS,
    COHORT_HIDE_FILTERS,
    STUDENT_LIST_SORT_FILTERS,
    STUDENT_LIST_HIDE_FILTERS,
    STUDENT_CARD_SORT_FILTERS,
    STUDENT_CARD_HIDE_FILTERS,
    COHORT_SORT_DIRECTIONS,
    STUDENT_CARD_SORT_DIRECTIONS,
    STUDENT_LIST_SORT_DIRECTIONS
} from "constants"

export const getCohortCardsByVisibilityFilter = (store) => {
    console.log('cards', store.views.studentCardSortFilter, store.views.studentCardSortDirection)

    let sortFunction = sortCohortFilter(store.views.studentCardSortFilter, store.views.studentCardSortDirection)
    let filterFunction = hideCohortFilter(store.views.studentCardHideFilter)

    let cohorts = [...store.cohorts];
    console.log(cohorts[0].students)
    let newCohorts = []
    cohorts.forEach(currentCohort => {
        currentCohort.students.sort(sortFunction).filter(filterFunction)
        newCohorts.push(currentCohort)
    })
    console.log(newCohorts[0].students)
    return newCohorts
};

export const getCohortListsByVisibilityFilter = (store) => {
    console.log('list', store.views.studentListSortFilter, store.views.studentListSortDirection)

    let sortFunction = sortCohortFilter(store.views.studentListSortFilter, store.views.studentListSortDirection)
    let filterFunction = hideCohortFilter(store.views.studentListHideFilter)

    let cohorts = [...store.cohorts];
    console.log(cohorts[0].students)
    let newCohorts = []
    cohorts.forEach(currentCohort => {
        currentCohort.students.sort(sortFunction).filter(filterFunction)
        newCohorts.push(currentCohort)
    })

    console.log(newCohorts[0].students)
    console.log('_______________________________________________________________________________________________')
    return newCohorts
};

function sortCohortFilter(sortFilter, sortDirection) {

    switch (sortFilter) {
        case "firstName":
            return (sortDirection === 'up') ? 
            (a, b) => {return ('' + a.firstName).localeCompare(b.firstName)} 
            : 
            (b, a) => {return ('' + a.firstName).localeCompare(b.firstName)} 
        case "lastName":
            return (sortDirection === 'up') ? 
            (a, b) => {return ('' + a.lastName).localeCompare(b.lastName)} 
            : 
            (b, a) => {return ('' + a.lastName).localeCompare(b.lastName)} 
        case "github":
            return (sortDirection === 'up') ? 
            (a, b) => {return ('' + a.github).localeCompare(b.github)} 
            : 
            (b, a) => {return ('' + a.github).localeCompare(b.github)} 
        case "timeSinceTouchpoint":
            return (sortDirection === 'up') ?
            (a,b) => {return getMostRecentCtime(b.touchpoints) - getMostRecentCtime(a.touchpoints)}
            :
            (b,a) => {return getMostRecentCtime(b.touchpoints) - getMostRecentCtime(a.touchpoints)}
        case "timeSinceCommit":
            return (sortDirection === 'up') ?
            (a,b) => {return getMostRecentCtime(b.commits) - getMostRecentCtime(a.commits)}
            :
            (b,a) => {return getMostRecentCtime(b.commits) - getMostRecentCtime(a.commits)}
        case "stoplightStatus" :
            return (sortDirection === 'up') ?
            (a, b) => {return mapStoplightStatusToInteger(b.touchpoints)-mapStoplightStatusToInteger(a.touchpoints)}
            :
            (b,a) => {return mapStoplightStatusToInteger(b.touchpoints)-mapStoplightStatusToInteger(a.touchpoints)}
        default:
            return (a,b) => {return 0}
    }
}

function hideCohortFilter(hideFilter) {
    switch (hideFilter) {
        case "all": {
            return (student) => {return true}
        }
        case "active" : {
            return (student) => {return student.enrolledStatus}
        }
        case "inactive" : {
            return (student) => {return !student.enrolledStatus}
        }
        case "default" : {
            return (student) => {return true}
        }
    }
}

function getMostRecentCtime(dbArray) {
    let mostRecentEntry = getMostRecentCtimeElement(dbArray)
    return new Date(mostRecentEntry.ctime).getTime()
}

function getMostRecentCtimeElement(dbArray) {
    if (!dbArray.length) return null

    return dbArray.sort((a,b) => {
        return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
    })[0]
}

function mapStoplightStatusToInteger(touchpoints) {
    let mostRecentTouchpoint = getMostRecentCtimeElement(touchpoints)
    let stoplightStatus = mostRecentTouchpoint ? mostRecentTouchpoint.stoplightStatus : null

    switch (stoplightStatus) {
        case "green" : {return 1}
        case "yellow" : {return 2}
        case "red" : {return 3}
        default : {return 4}
    }
}