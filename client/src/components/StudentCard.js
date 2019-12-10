import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// class StudentCard extends Component {
//     render() {
//         return (<h3>{this.props.student.github}</h3>)
//     }
// }

const StudentCard = ({ cohorts, studentId, cohortId }) =>{
    const student = cohorts.filter(cohort => {return cohort.id === cohortId})[0].students.filter(student => {return student.id === studentId})[0]
    const currentTouchpoint = student.touchpoints.sort((a,b) => {
        return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
    })[0]
    const currentStoplightStatus = currentTouchpoint ? currentTouchpoint.stoplightStatus : null

    return (
        <Card className={student.enrolledStatus ? 'student-card' : 'student-card student-card-inactive'}>
            <LinkContainer to={"/students/"+student.github} exact>
                <Card.Header className="d-flex flex-row linkstyle">
                    <div>
                        <img className="student-photo" src={student.photoUrl ? student.photoUrl : '/public/images/noPhoto.png'} alt="student photo"/>
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
                                        <span className="badge badge-pill badge-danger"><i className="material-icons pt-1 stoplight-badge">warning</i></span>
                                        )
                                    default: return (
                                        <span className="badge badge-pill badge-dark"><i className="material-icons pt-1 stoplight-badge">warning</i></span>
                                        )
                                }
                            })()}
                        </div>
                    </div>
                </Card.Header>
            </LinkContainer>
        </Card>
    )
}

const mapStateToProps = state => ({ 
    cohorts: state.cohorts
})

export default connect(mapStateToProps)(StudentCard);