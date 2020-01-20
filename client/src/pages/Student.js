import React from 'react';
import { connect } from "react-redux";

import {Table} from 'react-bootstrap'

import GithubGraph from './../components/GithubGraph'
import StoplightStatusIndicator from './../components/StoplightStatusIndicator'
import TouchpointTag from './../components/TouchpointTag'
import AddTouchpointModal from './../components/AddTouchpointModal'

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
                    <div className='d-flex flex-row container'>
                        <div>
                            <img className="student-photo" src={student.photoUrl ? student.photoUrl : '/images/noPhoto.png'} alt="student photo"/>
                        </div>
                        <div>
                            <h2>{student.firstName + ' ' + student.lastName}</h2>
                            <div className="d-flex flex-row">
                                <img src='/images/GitHub-Mark.png' style={{height:"25px"}} />
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
                                <div style={{border : "1px solid black"}}>
                                    <h4>Most Recent Touchpoint:</h4>
                                    <StoplightStatusIndicator stoplightStatus={currentStoplightStatus} />
                                    <p>{currentTouchpoint.comment}</p>
                                    <div>
                                        {currentTouchpoint.tags.map(tag => {
                                            return (<TouchpointTag tagStatus={tag.status} tagText={tag.text} key={tag.text}/>)
                                        })}
                                    </div>
                                    <AddTouchpointModal user={user} studentId={student.id} isStudentCard={false} />
                                </div>
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
                                    <tr>
                                        <td><StoplightStatusIndicator stoplightStatus={touchpoint.stoplightStatus} /></td>
                                        <td>{touchpoint.ctime}</td>
                                        <td>{touchpoint.comment}</td>
                                        <td>
                                            {touchpoint.tags.map(tag => {
                                                return (<TouchpointTag tagStatus={tag.status} tagText={tag.text} key={tag.text}/>)
                                            })}
                                        </td>
                                        <td>ToDo: Added By user X</td>
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