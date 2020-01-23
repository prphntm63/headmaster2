import React, { Component } from 'react';
import {Form, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import { connect } from "react-redux";
import { setStudentCardHideFilter, setStudentCardSortFilter, setStudentCardSortDirection} from "./../redux/actions"

class SortBar extends Component {

    handleStudentCardSortChange = (value) => {
        if (value === 'up' || value === 'down') {
            this.props.setStudentCardSortDirection(value.toUpperCase())
        } else {
            this.props.setStudentCardSortFilter(value.toUpperCase())
        }
    }

    handleStudentCardHideChange = (value) => {
        this.props.setStudentCardHideFilter(value.toUpperCase())
    }

    render() {
        return (
        <React.Fragment>
            <div className="d-flex flex-row justify-content-between mx-2">
                <h2>{this.props.currentCohort.name}</h2>
                <div className="sort-controls">
                    <h6>Sort:</h6>
                    <Form.Control as="select" value={this.props.views.studentCardSortFilter} onChange={evt => this.handleStudentCardSortChange(evt.target.value)}>
                        <option text="Name" value="firstName">Name</option>
                        <option text="Last Name" value="lastName"> Last Name</option>
                        <option text="Github Username" value="github"> Github Username</option>
                        <option text="Stoplight Status" value="stoplightStatus"> Stoplight Status</option>
                        <option text="Last Commit" value="timeSinceCommit"> Last Commit</option>
                        <option text="Last Touchpoint" value="timeSinceTouchpoint"> Last Touchpoint</option>
                    </Form.Control>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="sortUpDownCard" value={this.props.views.studentCardSortDirection} onChange={this.handleStudentCardSortChange}>
                            <ToggleButton value={'up'} variant="light">Up</ToggleButton>
                            <ToggleButton value={'down'} variant="light">Down</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    <h6>Show:</h6>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="hideStudentCard" value={this.props.views.studentCardHideFilter} onChange={this.handleStudentCardHideChange}>
                            <ToggleButton value={'active'} variant="light">Active</ToggleButton>
                            <ToggleButton value={'inactive'} variant="light">Inactive</ToggleButton>
                            <ToggleButton value={'all'} variant="light">All</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </div>
            </div>
        </React.Fragment>
    )}
}

const mapStateToProps = state => ({ 
    views : state.views
})

const mapDispatchToProps = {
    setStudentCardSortFilter,
    setStudentCardHideFilter,
    setStudentCardSortDirection
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBar);