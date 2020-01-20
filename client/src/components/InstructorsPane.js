import React from 'react';
import { connect } from "react-redux";

import InstructorCard from "./InstructorCard"
import AddInstructorModal from './AddInstructorModal'

const InstructorPane = ({currentCohort, user}) => {
    const userCohortRole = currentCohort.instructors[user.id] ? currentCohort.instructors[user.id].role : undefined
    
    return (
        <div>
            {user.superuser === 'superadmin' || user.superuser === 'admin' || userCohortRole === 'admin' || userCohortRole === 'instructor' ?
                (<div className="d-flex flex-row mt-3 mr-3">
                    <AddInstructorModal cohort={currentCohort} />
                </div>)
                :
                (<></>)
            }
            {currentCohort.id ? 
                (<React.Fragment>
                    <div className="d-flex flex-row flex-wrap student-cards" >
                        {currentCohort.instructors.map(instructor => {return <InstructorCard instructorId={instructor.id} cohortId={currentCohort.id} key={instructor.id}/>})}
                    </div>
                </React.Fragment>)
            :
                (<div></div>)
            }
        </div>
    )
}

const mapStateToProps = state => { 
    const user = state.user

    const pathName = window.location.pathname.replace(/\W/g, '')
    let currentCohortFilter = state.cohorts.length ? state.cohorts.filter(cohort => {return cohort.slug == pathName}) : []
    let currentCohort = currentCohortFilter.length ? currentCohortFilter[0] : null
    
    return {currentCohort, user}
}

export default connect(mapStateToProps)(InstructorPane);