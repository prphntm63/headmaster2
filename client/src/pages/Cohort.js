import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import { connect } from "react-redux";
import { getCohortByVisibilityFilter } from './../redux/selectors'

import StudentCard from "./../components/StudentCard"
import SortBar from "./../components/SortBar"


class Cohort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName : window.location.pathname.replace(/\W/g, '')
        }
    }

    render() {
        let currentCohortFilter = this.props.cohorts.length ? this.props.cohorts.filter(cohort => {return cohort.slug == this.state.pathName}) : []
        let currentCohort = currentCohortFilter.length ? currentCohortFilter[0] : null

        return ( 
            <React.Fragment>
                {currentCohort && this.props.user.id ?
                    <React.Fragment>
                        <SortBar currentCohort={currentCohort} />
                        <div className="d-flex flex-row flex-wrap student-cards">
                            {currentCohort.students.map(student => {return <StudentCard studentId={student.id} cohortId={currentCohort.id} views={this.props.views}/>})}
                        </div>
                    </React.Fragment>
                    :
                    <h2>Nothing here...</h2>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { 
    // cohorts: state.cohorts,
    const user = state.user
    const views = state.views
    const cohorts = getCohortByVisibilityFilter(
        state, 
        views.studentCardSortFilter, 
        views.studentCardSortDirection, 
        views.studentCardHideFilter
        )
    
    return {user, views, cohorts}
}

export default connect(mapStateToProps)(Cohort);