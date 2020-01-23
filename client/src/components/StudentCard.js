import React from 'react';
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import StoplightStatusIndicator from './StoplightStatusIndicator';
import GithubGraph from './GithubGraph'
import AddTouchpointModal from "./AddTouchpointModal"
import StudentCardBodyTouchpoint from "./StudentCardBodyTouchpoint"

const StudentCardHeader = ({student, currentStoplightStatus}) => (
    <LinkContainer to={"/students/"+student.github} exact>
        <Card.Header className="d-flex flex-row linkstyle">
            <div>
                <img className="student-photo" src={student.photoUrl ? student.photoUrl : '/images/noPhoto.png'} alt="student headshot"/>
            </div>
            <div className="w-100">
                <div className="d-flex flex-row justify-content-between stoplight-status-div">
                    <h4 className="mx-2 student-name text-truncate">{student.firstName + ' ' + student.lastName}</h4>
                    <StoplightStatusIndicator stoplightStatus={currentStoplightStatus} />
                </div>
                <div className="d-flex flex-row">
                    <img src='/images/GitHub-Mark.png' style={{height:"25px"}} alt="github logo" />
                    <a href={"https://github.com/"+student.github}>{student.github}</a>
                </div>
            </div>
        </Card.Header>
    </LinkContainer>
)

const StudentCardBody = ({student, currentTouchpoint}) => (
    <Card.Body className="d-flex flex-row student-info">
        <StudentCardBodyTouchpoint currentTouchpoint={currentTouchpoint} isStudentCard={true} />
        <StudentCardBodyCommits student={student} />
    </Card.Body>
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

const StudentCardFooter = ({student, user}) => (
    <Card.Footer className="d-flex flex-row student-card-footer p-0">
        <div className="d-flex justify-content-center py-2">
            <LinkContainer to={"/students/" + student.github}>
                <Button variant="link">Details</Button>
            </LinkContainer>
        </div>
        <AddTouchpointModal user={user} studentId={student.id} isStudentCard={true} />
        {/* <div className="d-flex justify-content-center py-2 add-touchpoint-button">
            <a href='#'>Add Touchpoint</a>
        </div> */}
    </Card.Footer>
)

const StudentCard = ({ cohorts, studentId, cohortId, user }) => {
    const student = cohorts.filter(cohort => {return cohort.id === cohortId})[0].students.filter(student => {return student.id === studentId})[0]
    const currentTouchpoint = student.touchpoints.sort((a,b) => {
        return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
    })[0]

    return (
        <Card className={student.enrolledStatus ? 'student-card' : 'student-card student-card-inactive'}>
            <StudentCardHeader student={student} currentStoplightStatus = {currentTouchpoint ? currentTouchpoint.stoplightStatus : null} />
            <StudentCardBody student={student} currentTouchpoint={currentTouchpoint} />
            <StudentCardFooter student={student} user={user} />
        </Card>
    )
}

const mapStateToProps = (state) => ({ 
    user : state.user,
    cohorts: state.cohorts
    
})

export default connect(mapStateToProps)(StudentCard);