import React from 'react';
import { Modal, Button } from "react-bootstrap";
import {connect} from 'react-redux'

import { removeInstructor } from './../redux/actions'

class RemoveInstructorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow : false,
        }
    }

    handleOpen = () => {
        this.setState({
            modalShow : true
        })
    }

    handleClose = () => {
        this.setState({
            modalShow : false
        })
    }

    handleRemoveInstructor = (evt) => {
        evt.stopPropagation()
        evt.preventDefault()
        
        fetch('/api/instructors', {
            method: 'DELETE',
            body: JSON.stringify({
                "instructorId" : this.props.instructor.id,
                "cohortId" : this.props.cohort.id
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log(`success - removed instructor ${this.props.instructor.github} from cohor ${this.props.cohort.name}`)
                return response.json()
            } else {
                console.log('ERRORRRORRR - ', response)
            }
        })
        .then(removeInstructorResponse => {
            this.props.removeStudent({
                cohortId : removeInstructorResponse.cohort,
                instructorId : removeInstructorResponse.instructor
            })
            this.handleClose()
        })
        .catch(err => {
            console.log(`error removing instructor ${this.props.instructor.github} from cohort ${this.props.cohort.name} - `, err)
            window.alert('Server error')  
        })
    }

    render() {

        return (
            <React.Fragment>
                <Button variant="danger" onClick={this.handleOpen}>X</Button>

                <Modal show={this.state.modalShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Remove Instructor...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to remove {this.props.instructor.firstName} {this.props.instructor.lastName} from {this.props.cohort.name}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.handleRemoveInstructor}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    removeInstructor
}

export default connect(null, mapDispatchToProps)(RemoveInstructorModal)