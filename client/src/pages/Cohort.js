import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import { connect } from "react-redux";

import StudentCard from "./../components/StudentCard"
import SortBar from "./../components/SortBar"


const Cohort = ({ cohorts, user }) => {

    let pathName = window.location.pathname.replace(/\W/g, '')
    let currentCohort = null

    if (user.id && cohorts.length) {
        let currentCohortFilter = cohorts.filter(cohort => {return cohort.slug == pathName})
        currentCohort = currentCohortFilter.length ? currentCohortFilter[0] : null
    }    

    return ( 
        <React.Fragment>
            {currentCohort && user.id ?
                <React.Fragment>
                    <SortBar currentCohort={currentCohort} />
                    <div className="d-flex flex-row flex-wrap student-cards">
                        {currentCohort.students.map(student => {return <StudentCard studentId={student.id} cohortId={currentCohort.id}/>})}
                    </div>
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

export default connect(mapStateToProps)(Cohort);