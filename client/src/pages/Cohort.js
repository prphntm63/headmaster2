import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import { connect } from "react-redux";

import StudentCardPane from "./../components/StudentCardPane"
import StudentListPane from "./../components/StudentListPane"
import InstructorsPane from "./../components/InstructorsPane"
import SettingsPane from "./../components/SettingsPane"

class Cohort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab : "studentCards"
        }
    }

    render() {
        return ( 
            <React.Fragment>
                {this.props.user.id ?
                    <React.Fragment>
                        <Tabs activeKey={this.state.currentTab} onSelect={tab => this.setState({currentTab : tab})}>
                            <Tab eventKey="studentCards" title="Dashboard">
                                <StudentCardPane />
                            </Tab>
                            <Tab eventKey="studentList" title="Students">
                                <StudentListPane />
                            </Tab>
                            <Tab eventKey="instructorList" title="Instructors">
                                <InstructorsPane />
                            </Tab>
                            <Tab eventKey="cohortSettings" title="Settings">
                                <SettingsPane />
                            </Tab>
                        </Tabs>
                    </React.Fragment>
                    :
                    <h2>Nothing here...</h2>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => (
    {user : state.user}
)

export default connect(mapStateToProps)(Cohort);