import React from 'react';
import { Modal, Button } from "react-bootstrap";
import {connect} from 'react-redux'

import { removeStudent } from './../redux/actions'

class RemoveStudentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow : false,
        }
    }

    handleOpen = (evt) => {
        evt.stopPropagation()
        evt.preventDefault()
        this.setState({
            modalShow : true
        })
    }

    handleClose = () => {
        this.setState({
            modalShow : false
        })
    }

    handleRemoveStudent = (evt) => {
        evt.stopPropagation()
        evt.preventDefault()
       
        fetch('/api/students', {
            method: 'DELETE',
            body: JSON.stringify({
                "studentId" : this.props.student.id,
                "cohortId" : this.props.cohort.id 
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log(`success - removed student ${this.props.student.github} from cohor ${this.props.cohort.name}`)
                return response.json()
            } else {
                console.log('ERRORRRORRR - ', response)
            }
        })
        .then(removeStudentResponse => {
            this.props.removeStudent({
                cohortId : removeStudentResponse.cohort,
                studentId : removeStudentResponse.student
            })
            this.handleClose()
        })
        .catch(err => {
            console.log(`error removing student ${this.props.student.github} from cohort ${this.props.cohort.name} - `, err)
            window.alert('Server error')  
        })
    }

    render() {

        return (
            <React.Fragment>
                <Button variant="danger" onClick={this.handleOpen}>X</Button>

                <Modal show={this.state.modalShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Remove Student...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to remove {this.props.student.firstName} {this.props.student.lastName} from {this.props.cohort.name}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.handleRemoveStudent}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    removeStudent
}

export default connect(null, mapDispatchToProps)(RemoveStudentModal)