import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const StudentCardHeader = ({student, currentStoplightStatus}) => (
    <LinkContainer to={"/students/"+student.github} exact>
        <Card.Header className="d-flex flex-row linkstyle">
            <div>
                <img className="student-photo" src={student.photoUrl ? student.photoUrl : '/images/noPhoto.png'} alt="student photo"/>
            </div>
            <div className="w-100">
                <div className="d-flex flex-row justify-content-between stoplight-status-div">
                    <h4 className="mx-2 student-name text-truncate">{student.firstName + ' ' + student.lastName}</h4>
                    {(() => {
                        switch (currentStoplightStatus) {
                            case 'green': return (
                                <span className="badge badge-pill badge-success"><i className="material-icons pt-1 stoplight-badge">done</i></span>
                                )
                            case 'yellow': return (
                                <span className="badge badge-pill badge-warning"><i className="material-icons pt-1 stoplight-badge">help_outline</i></span>
                                )
                            case 'red': return (
                                <span className="badge badge-pill badge-danger"><i className="material-icons pt-1">warning</i></span>
                                )
                            default: return (
                                <span className="badge badge-pill badge-secondary"><i className="material-icons pt-1">warning</i></span>
                                )
                        }
                    })()}
                </div>
                <div className="d-flex flex-row">
                    <img src='/images/GitHub-Mark.png' style={{height:"25px"}} />
                    <a href={"https://github.com/"+student.github}>{student.github}</a>
                </div>
            </div>
        </Card.Header>
    </LinkContainer>
)

const StudentCardBody = ({student, currentTouchpoint}) => (
    <Card.Body className="d-flex flex-row student-info">
        <StudentCardBodyTouchpoint student={student} currentTouchpoint={currentTouchpoint} />
        <StudentCardBodyCommits student={student} />
    </Card.Body>
)

const StudentCardBodyTouchpoint = ({student, currentTouchpoint}) => (
    <div className="d-flex flex-column student-touchpoint">
        <div className="student-touchpoint-title">Last Touchpoint</div>
        {currentTouchpoint && currentTouchpoint.comment ? (<div className="student-touchpoint-comment"><small>{currentTouchpoint.comment}</small></div>) : <div></div>}
        {currentTouchpoint && currentTouchpoint.tags ? 
            currentTouchpoint.tags.map(tag => {
                switch (tag.status) {
                    case 'green': return (<span className="badge badge-success mr-auto my-1">{tag.text}</span>)
                    case 'yellow': return (<span className="badge badge-warning mr-auto my-1">{tag.text}</span>)
                    case 'red': return (<span className="badge badge-danger mr-auto my-1">{tag.text}</span>)
                }
            })
        : 
        <div></div>
        }
        {currentTouchpoint ? (<div className="blockquote-footer touchpoint-date">{timeSince(currentTouchpoint.ctime) + ' ago by ' + currentTouchpoint.user} </div>) : <div></div>}
    </div>
)

const StudentCardBodyCommits = ({student}) => (
    <div className="d-flex flex-column student-commits">
        <div className="student-touchpoint-title">Latest Commits</div>
        {student.commits && student.commits.length ? 
            (<GithubGraph student={student} />)
        :
            (<div></div>)
        }
    </div>
)

const GithubGraph = ({student}) => (
    <div className="graph-container">
        {['','','M','','W','','F',''].map(headerDay => {
            return (<div className="graph-item graph-item-header">{headerDay}</div>)})
        }
        {parseCommits(student.commits).commits.map((commitDay, idx) => {
            if (!commitDay.commits.length) {
                return (
                    <React.Fragment>
                        {idx%7 === 0 ? <div className="graph-item graph-item-header">{'#' + (Math.floor(idx/7)+1)}</div> : ''}
                        <div className="graph-item no-commits"></div>
                    </React.Fragment>
                )
            } else if (commitDay.commits.length < 2) {
                return (
                    <React.Fragment>
                        {idx%7 === 0 ? <div className="graph-item graph-item-header">{'#' + (Math.floor(idx/7)+1)}</div> : ''}
                        <div className="graph-item sm-commits"></div>
                    </React.Fragment>
                )
            } else if (commitDay.commits.length < 3) {
                return (
                    <React.Fragment>
                        {idx%7 === 0 ? <div className="graph-item graph-item-header">{'#' + (Math.floor(idx/7)+1)}</div> : ''}
                        <div className="graph-item md-commits"></div>
                    </React.Fragment>
                )
            } else if (commitDay.commits.length < 3) {
                return (
                    <React.Fragment>
                        {idx%7 === 0 ? <div className="graph-item graph-item-header">{'#' + (Math.floor(idx/7)+1)}</div> : ''}
                        <div className="graph-item lg-commits"></div>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        {idx%7 === 0 ? <div className="graph-item graph-item-header">{'#' + (Math.floor(idx/7)+1)}</div> : ''}
                        <div className="graph-item xl-commits"></div>
                    </React.Fragment>
                )
            }
        })}
    </div>
)

const StudentCardFooter = ({student}) => (
    <Card.Footer className="d-flex flex-row student-card-footer p-0">
        <div className="d-flex justify-content-center py-2">
            <LinkContainer to={"/students/" + student.github}>
                <a href>Details</a>
            </LinkContainer>
        </div>
        <div className="d-flex justify-content-center py-2 add-touchpoint-button">
            <a href='#'>Add Touchpoint</a>
        </div>
    </Card.Footer>
)

const StudentCard = ({ cohorts, studentId, cohortId }) => {
    const student = cohorts.filter(cohort => {return cohort.id === cohortId})[0].students.filter(student => {return student.id === studentId})[0]
    const currentTouchpoint = student.touchpoints.sort((a,b) => {
        return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
    })[0]

    return (
        <Card className={student.enrolledStatus ? 'student-card' : 'student-card student-card-inactive'}>
            <StudentCardHeader student={student} currentStoplightStatus = {currentTouchpoint ? currentTouchpoint.stoplightStatus : null} />
            <StudentCardBody student={student} currentTouchpoint={currentTouchpoint} />
            <StudentCardFooter student={student} />
        </Card>
    )
}

const mapStateToProps = state => ({ 
    cohorts: state.cohorts
})

export default connect(mapStateToProps)(StudentCard);

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

function getMostRecentTouchpoint(touchpointArray) {
    return touchpointArray.sort((a,b) => {
        return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
    })[0]
}

function parseCommits(commits) {
    if (!commits.length) return null

    let today = new Date()
    let dayOfWeek = today.getDay()
    let commitsArray = []
    let lastCommit = null

    // Show 4 weeks max
    for (let idx=(22+dayOfWeek); idx>0; idx--) {
        let offset = 24*60*60*1000
        let dayObject = {
            commits : [],
            repos : [],
            date : null,
            total : null,
            add : null,
            sub : null
        }

        commits.forEach(commit => {
            commit.ctime = new Date(commit.ctime)
            if ((commit.ctime.getTime() < today.getTime() - (idx*offset) ) && (commit.ctime.getTime() > today.getTime() - (idx*offset) - offset )) {
                
                dayObject.commits.push(commit)
                if (!dayObject.repos.find(repo => {return repo === commit.repo} ) ) {
                    dayObject.repos.push(commit.repo)
                }
                dayObject.date = commit.ctime.getDate()
                dayObject.total += commit.total
                dayObject.add += commit.added
                dayObject.sub += commit.deleted

                lastCommit = commit
            }
        })
        commitsArray.push(dayObject)
    }

    return {
        "commits" : commitsArray,
        "lastCommit" : lastCommit ? timeSince(lastCommit.ctime) : null,
        "commitCreated" : lastCommit ? lastCommit.ctime : null
    }
}