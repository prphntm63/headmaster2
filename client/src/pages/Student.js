import React from 'react';
import { connect } from "react-redux";

import {Table} from 'react-bootstrap'

import GithubGraph from './../components/GithubGraph'
import StoplightStatusIndicator from './../components/StoplightStatusIndicator'
import TouchpointTag from './../components/TouchpointTag'
import AddTouchpointModal from './../components/AddTouchpointModal'
import StudentCardBodyTouchpoint from './../components/StudentCardBodyTouchpoint'

const Student = ({ cohorts, user }) => {
    let pathName = window.location.pathname.split(/[/ ]+/).pop()
    let allStudents = []
    cohorts.forEach(cohort => {
        cohort.students.forEach(student => {
            allStudents.push(student)
        })
    })

    let allInstructors = []
    cohorts.forEach(cohort => {
        cohort.instructors.forEach(instructor => {
            allInstructors.push(instructor)
        })
    })
    
    const student = allStudents.filter(student => {return student.github === pathName})[0]
    const currentTouchpoint = student.touchpoints.sort((a,b) => {
        return new Date(b.ctime).getTime() - new Date(a.ctime).getTime() 
    })[0]   

    return ( 
        <React.Fragment>
            {student && user.id ?
                <React.Fragment>
                    <div className='d-flex flex-row container'>
                        <div>
                            <img className="student-photo" src={student.photoUrl ? student.photoUrl : '/images/noPhoto.png'} alt="student headshot"/>
                        </div>
                        <div>
                            <h2>{student.firstName + ' ' + student.lastName}</h2>
                            <div className="d-flex flex-row">
                                <img src='/images/GitHub-Mark.png' style={{height:"25px"}} alt="github logo" />
                                <a href={"https://github.com/"+student.github}>{student.github}</a>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex flex-row justify-content-between container'>
                        <div style={{width : "250px", height : "150px"}}>
                            <GithubGraph student={student} />
                        </div>
                        
                        {currentTouchpoint ? 
                            (
                                <div>
                                    <StudentCardBodyTouchpoint currentTouchpoint={currentTouchpoint} isStudentCard={false} />
                                    <AddTouchpointModal user={user} studentId={student.id} isStudentCard={false} />
                                </div>
                                // <div style={{border : "1px solid black"}}>
                                //     <h4>Most Recent Touchpoint:</h4>
                                //     <StoplightStatusIndicator stoplightStatus={currentStoplightStatus} />
                                //     <p>{currentTouchpoint.comment}</p>
                                //     <div>
                                //         {currentTouchpoint.tags.map(tag => {
                                //             return (<TouchpointTag tagStatus={tag.status} tagText={tag.text} key={tag.text}/>)
                                //         })}
                                //     </div>
                                //     <AddTouchpointModal user={user} studentId={student.id} isStudentCard={false} />
                                // </div>
                            ) : 
                            (
                                <div style={{border : "1px solid black"}}>
                                    <h4>No Touchpoints Added</h4>
                                    <AddTouchpointModal user={user} studentId={student.id} isStudentCard={false} />
                                </div>
                            )
                        }
                        
                    </div>

                    <div className="my-5">
                        <Table>
                            <tbody>
                                {student.touchpoints.map(touchpoint => (
                                    <tr key={touchpoint.id}>
                                        <td><StoplightStatusIndicator stoplightStatus={touchpoint.stoplightStatus} /></td>
                                        <td>{touchpoint.comment}</td>
                                        <td>
                                            {Array.isArray( touchpoint.tags ) ? touchpoint.tags.map(tag => {
                                                return (<TouchpointTag tagStatus={tag.status} tagText={tag.text} key={tag.text}/>)
                                            }) : (<></>)}
                                        </td>
                                        <td>{timeSince(touchpoint.ctime)
                                            + ' ago by ' +
                                            allInstructors.filter(instructor => {return instructor.id === touchpoint.user})[0].firstName 
                                            + ' ' +
                                            allInstructors.filter(instructor => {return instructor.id === touchpoint.user})[0].lastName
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
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

export default connect(mapStateToProps)(Student);

function timeSince(dateString) {
    let date = new Date(dateString)
    if (!date) {
        return ''
    }
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}