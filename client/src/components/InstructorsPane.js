import React from 'react';
import { connect } from "react-redux";

import StudentCard from "./StudentCard"

const InstructorPane = ({currentCohort}) => (
    <div>
        {currentCohort.id ? 
            (<React.Fragment>
                <div className="d-flex flex-row flex-wrap student-cards" >
                    {/* {currentCohort.students.map(student => {return <StudentCard studentId={student.id} cohortId={currentCohort.id} views={views} key={student.id}/>})} */}
                    Instructors go here
                </div>
            </React.Fragment>)
        :
            (<div></div>)
        }
    </div>
)

const mapStateToProps = state => { 

    const pathName = window.location.pathname.replace(/\W/g, '')
    let currentCohortFilter = state.cohorts.length ? state.cohorts.filter(cohort => {return cohort.slug == pathName}) : []
    let currentCohort = currentCohortFilter.length ? currentCohortFilter[0] : null
    
    return {currentCohort}
}

export default connect(mapStateToProps)(InstructorPane);