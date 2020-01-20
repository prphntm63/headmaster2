import React from 'react';
import { connect } from "react-redux";
import { Card, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const InstructorCardHeader = ({instructor}) => (
    <Card.Header className="d-flex flex-row linkstyle">
        <div>
            <img className="student-photo" src={instructor.photoUrl ? instructor.photoUrl : '/images/noPhoto.png'} alt="student photo"/>
        </div>
        <div className="w-100">
            <div className="d-flex flex-row stoplight-status-div">
                <h4 className="mx-2 student-name text-truncate">{instructor.firstName + ' ' + instructor.lastName}</h4>
            </div>
            <div className="d-flex flex-row ml-2">
                <p><Badge variant="secondary">{instructor.role ? instructor.role.toUpperCase() : ''}</Badge></p>
            </div>
        </div>
    </Card.Header>
)

const InstructorCard = ({cohorts, cohortId, instructorId}) => {
    const instructor = cohorts.filter(cohort => {return cohort.id === cohortId})[0].instructors.filter(instructor => {return instructor.id === instructorId})[0]

    return (
        <Card className="student-card">
            <InstructorCardHeader instructor={instructor} />
            <Card.Body>
                Feature Todo:
                <ul>
                    <li>Add most recent touchpoint</li>
                    <li>Add method to get all touchpoints for cohort</li>
                </ul>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state) => ({ 
    cohorts: state.cohorts
})

export default connect(mapStateToProps)(InstructorCard);