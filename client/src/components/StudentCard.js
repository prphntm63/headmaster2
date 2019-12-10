import React, { Component } from 'react';
import { connect } from "react-redux";

// class StudentCard extends Component {
//     render() {
//         return (<h3>{this.props.student.github}</h3>)
//     }
// }

const StudentCard = ({ cohorts, studentId, cohortId }) =>{
    const student = cohorts.filter(cohort => {return cohort.id === cohortId})[0].students.filter(student => {return student.id === studentId})[0]
    
    return(<h3>{student.firstName + ' ' + student.lastName}</h3>)
}

const mapStateToProps = state => ({ 
    cohorts: state.cohorts
})

export default connect(mapStateToProps)(StudentCard);