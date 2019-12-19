import React from 'react';
import { connect } from "react-redux";

const Student = ({ cohorts, user }) => {
    let pathName = window.location.pathname.split(/[/ ]+/).pop()
    let allStudents = []
    cohorts.forEach(cohort => {
        cohort.students.forEach(student => {
            allStudents.push(student)
        })
    })
    
    const student = allStudents.filter(student => {return student.github === pathName})[0]
    const currentTouchpoint = student.touchpoints.sort((a,b) => {
        return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
    })[0]
    const currentStoplightStatus = currentTouchpoint ? currentTouchpoint.stoplightStatus : null    

    return ( 
        <React.Fragment>
            {student && user.id ?
                <React.Fragment>
                    <h2>{student.firstName + ' ' + student.lastName}</h2>
                </React.Fragment>
                :
                <h2>Nothing here...</h2>
            }
        </React.Fragment>
    )
}

const mapStateToProps = state => ({ 
    cohorts: state.cohorts,
    user: state.user 
})

export default connect(mapStateToProps)(Student);