import React, { Component } from 'react';
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
// import { getCohortListsByVisibilityFilter } from './../redux/selectors'
import { setStudentListHideFilter, setStudentListSortFilter, setStudentListSortDirection} from "./../redux/actions"

import { ListGroup, Row, Col, Badge, Button } from 'react-bootstrap';

import StoplightStatusIndicator from './StoplightStatusIndicator'

class StudentListPaneHeader extends React.Component {

    handleSortClick = (evt) => {
        evt.preventDefault()

        let sortType = evt.target.getAttribute('sort_type')
        if (!sortType) return

        if (this.props.views.studentListSortFilter === sortType) {
            let newSortDirection = this.props.views.studentListSortDirection === 'up' ? 'down' : 'up'
            this.props.setStudentListSortDirection(newSortDirection.toUpperCase())
        } else {
            this.props.setStudentListSortFilter(sortType.toUpperCase())
        }
    }

    render () {
        return (
            <ListGroup.Item variant="secondary">
                <Row>
                    <Col xs={1} onClick={(evt) => {this.handleSortClick(evt)}}>
                        <h6 sort_type="stoplightStatus" className="linkstyle d-flex flex-row">
                            Status {this.props.views.studentListSortFilter === "stoplightStatus" ? 
                                (<Badge variant="light" className="ml-2">{this.props.views.studentListSortDirection === 'up' ? "▲" : "▼"}</Badge>) 
                                : (<span></span>)
                            }
                        </h6>
                    </Col>
                    <Col xs={5} onClick={(evt) => {this.handleSortClick(evt)}}>
                        <h6 sort_type="firstName" className="linkstyle d-flex flex-row">
                            Name {this.props.views.studentListSortFilter === "firstName" ? 
                                (<Badge variant="light" className="ml-2">{this.props.views.studentListSortDirection === 'up' ? "▲" : "▼"}</Badge>) 
                                : (<span></span>)
                            }
                        </h6>
                    </Col>
                    <Col xs={2} onClick={(evt) => {this.handleSortClick(evt)}}>
                        <h6 sort_type="timeSinceTouchpoint" className="linkstyle d-flex flex-row">
                            Last Touchpoint {this.props.views.studentListSortFilter === "timeSinceTouchpoint" ? 
                                (<Badge variant="light" className="ml-2">{this.props.views.studentListSortDirection === 'up' ? "▲" : "▼"}</Badge>) 
                                : (<span></span>)
                            }
                        </h6>
                    </Col>
                    <Col xs={2} onClick={(evt) => {this.handleSortClick(evt)}}>
                        <h6 sort_type="timeSinceCommit" className="linkstyle d-flex flex-row">
                            Last Commit {this.props.views.studentListSortFilter === "timeSinceCommit" ? 
                                (<Badge variant="light" className="ml-2">{this.props.views.studentListSortDirection === 'up' ? "▲" : "▼"}</Badge>) 
                                : (<span></span>)
                            }
                        </h6>
                    </Col>
                    <Col xs={1} onClick={(evt) => {this.handleSortClick(evt)}}>
                        <h6 sort_type="github" className="linkstyle d-flex flex-row">
                            Active {this.props.views.studentListSortFilter === "github" ? 
                                (<Badge variant="light" className="ml-2">{this.props.views.studentListSortDirection === 'up' ? "▲" : "▼"}</Badge>) 
                                : (<span></span>)
                            }
                        </h6>
                    </Col>
                    <Col xs={1}>

                    </Col>
                </Row>
            </ListGroup.Item>
    )}
}

const StudentListPaneBody = ({currentCohort}) => (
    <React.Fragment>
        {currentCohort.students.map(student => {
            const currentTouchpoint = student.touchpoints.sort((a,b) => {
                return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
            })[0]
            const currentCommit = student.commits.sort((a,b) => {
                return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
            })[0]
            
            return (
            <LinkContainer to={"/students/" + student.github}>
                <ListGroup.Item action>
                    <Row>
                        <Col xs={1}><StoplightStatusIndicator status={student.stoplightStatus} /></Col>
                        <Col xs={5}>{student.firstName + ' ' + student.lastName}</Col>
                        <Col xs={2}>{timeSince(currentTouchpoint.ctime)}</Col>
                        <Col xs={2}>{timeSince(currentCommit.ctime)}</Col>
                        <Col xs={1}>{student.enrolledStatus ? 'Y' : 'N'}</Col>
                        <Col xs={1}>
                            <Button variant="danger" value={student.id} onClick={deleteStudent}>X</Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </LinkContainer>
            
        )})}
    </React.Fragment>
)

class StudentListPane extends React.Component {

    render() {
        const updatedCohorts = getCohortsListByVisibilityFilter(this.props.cohorts, this.props.views)
        const pathName = window.location.pathname.replace(/\W/g, '')
        const currentCohortFilter = updatedCohorts.length ? updatedCohorts.filter(cohort => {return cohort.slug == pathName}) : []
        const currentCohort = currentCohortFilter.length ? currentCohortFilter[0] : null

        return (<div>
            {currentCohort ? 
                (<React.Fragment>
                    
                    <div className="container-lg">
                        <div className="d-flex flex-row">
                            <h2>{currentCohort.name}</h2>
                            <Button variant="primary" value="addStudent" onClick={addStudent} className="ml-auto btn-lg px-2 py-0 mb-2">＋</Button>
                        </div>
                        <ListGroup>
                            <StudentListPaneHeader {...this.props} />
                            <StudentListPaneBody currentCohort={currentCohort} />
                        </ListGroup>
                    </div>
                </React.Fragment>)
            :
                (<div>Nothing Here...</div>)
            }
        </div>)
    }
}

const addStudent = (evt) => {
    evt.preventDefault()
    console.log('Todo: add student modal')
}

const deleteStudent = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    let studentId = evt.target.value
    console.log('Todo: delete student ', studentId)
}

const mapDispatchToProps = {
    setStudentListSortFilter,
    setStudentListHideFilter,
    setStudentListSortDirection
}

const mapStateToProps = state => { 
    const views = state.views
    const cohorts = state.cohorts
    
    return {views, cohorts}
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentListPane);

const getCohortsListByVisibilityFilter = (cohortsProp, views) => {

    let sortFunction = sortCohortFilter(views.studentListSortFilter, views.studentListSortDirection)
    let filterFunction = hideCohortFilter(views.studentListHideFilter)

    let cohorts = [...cohortsProp];
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


function timeSince(dateString) {
    let date = new Date(dateString)
    if (!date) {
        return ''
    }
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}