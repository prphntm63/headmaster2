import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { connect } from "react-redux";

const Cohort = ({ cohorts }) => {
    console.log(cohorts)
    // let currentCohort = cohorts.filter(cohort => {return cohort.slug == window.location.pathname.replace(/\W/g, '')})
    let pathName = window.location.pathname.replace(/\W/g, '')
    

    return ( 
        <React.Fragment>
            <h1>{pathName}</h1>
            {/* {currentCohort.length ?
                <h2>{currentCohort.name}</h2>

                :
                <h2>Nothing here...</h2>
            } */}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({ cohorts: state.cohorts })

export default connect(mapStateToProps)(Cohort);