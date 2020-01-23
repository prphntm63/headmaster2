import React from 'react';
import { connect } from "react-redux";

import StudentCard from "./StudentCard"
import SortBar from "./SortBar"

const StudentCardPane = ({views, currentCohort}) => (
    <div>
        {currentCohort.id ? 
            (<React.Fragment>
                <SortBar currentCohort={currentCohort} />
                <div className="d-flex flex-row flex-wrap student-cards" >
                    {currentCohort.students.map(student => {return <StudentCard studentId={student.id} cohortId={currentCohort.id} views={views} key={student.id}/>})}
                </div>
            </React.Fragment>)
        :
            (<div></div>)
        }
    </div>
)

const mapStateToProps = state => { 
    const views = state.views

    let cohorts = getCohortsByVisibilityFilter(state)

    const pathName = window.location.pathname.replace(/\//g, "")
    let currentCohortFilter = cohorts.length ? cohorts.filter(cohort => {return cohort.slug === pathName}) : []
    let currentCohort = currentCohortFilter.length ? currentCohortFilter[0] : null
    
    return {views, currentCohort}
}

export default connect(mapStateToProps)(StudentCardPane);

const getCohortsByVisibilityFilter = (store) => {
    let sortFunction = sortCohortFilter(store.views.studentCardSortFilter, store.views.studentCardSortDirection)
    let filterFunction = hideCohortFilter(store.views.studentCardHideFilter)

    let cohorts = [...store.cohorts];
    let newCohorts = []
    cohorts.forEach(currentCohort => {
        currentCohort.students.sort(sortFunction).filter(filterFunction)
        newCohorts.push(currentCohort)
    })
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
        default : {
            return (student) => {return true}
        }
    }
}

function getMostRecentCtime(dbArray) {
    let mostRecentEntry = getMostRecentCtimeElement(dbArray)
    return mostRecentEntry ? new Date(mostRecentEntry.ctime).getTime() : 0
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