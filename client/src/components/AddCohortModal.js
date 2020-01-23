import React from 'react';
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import {connect} from 'react-redux'

import { addCohort } from './../redux/actions'

class AddCohortModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput : '',
            slugInput : '',
            dateInput : new Date().toISOString().split('T')[0],
            graduated : false,
            modalShow : false,
            errors : {
                nameInput : null,
                slugInput : null,
                dateInput : null
            }
        }
    }

    handleOpen = () => {
        this.setState({
            modalShow : true
        })
    }

    handleClose = () => {
        this.setState({
            githubInput : '',
            firstnameInput : '',
            lastnameInput : '',
            photoUrl : '',
            modalShow : false
        })
    }

    handleAddCohort = () => {
        
        fetch('/api/cohorts', {
            method: 'POST',
            body: JSON.stringify({
                "name" : this.state.nameInput,
                "startDate" : this.state.dateInput,
                "slug" : this.state.slugInput,
                "graduated" : this.state.graduated
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('success')
                return response.json()
            } else {
                console.log('ERRORRRORRR - ', response)
            }
        })
        .then(newCohortResponse => {
            this.props.addCohort(newCohortResponse)
            this.handleClose()
        })
        .catch(err => {
            if (err.status === 400) {
                err.json()
                .then(responseJson => {
                    window.alert(`Cohort failed to add! \n${responseJson.errors.map(error => {return error.field + ': ' + error.error + '\n'}).join('')}`)
                })
            } else {
                console.log('error adding cohort - ', err)
                window.alert('Server error')
            }   
        })
        
        // this.handleClose()
    }

    render() {

        return (
            <React.Fragment>
                <Button variant="primary" value="addStudent" onClick={this.handleOpen} className="ml-auto btn-lg px-2 py-0 mb-2">＋</Button>

                <Modal show={this.state.modalShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Cohort...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="my-2">
                                <Form.Group as={Col} controlId="inputFirstName">
                                    <Form.Label>Cohort Name</Form.Label>
                                    <Form.Control 
                                        type="input" 
                                        placeholder="Cohort Name" 
                                        value={this.state.nameInput} 
                                        onChange={(evt) => {this.setState({nameInput : evt.target.value})}}
                                        isValid={this.state.errors.nameInput !== null}
                                        isInvalid={this.state.errors.nameInput}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="inputLastName">
                                    <Form.Label>Slug</Form.Label>
                                    <Form.Control 
                                        type="input" 
                                        placeholder="For quick URL access" 
                                        value={this.state.slugInput} 
                                        onChange={(evt) => {this.setState({slugInput : evt.target.value})}}
                                        isValid={this.state.errors.slugInput !== null}
                                        isInvalid={this.state.errors.slugInput}></Form.Control>
                                </Form.Group>
                            </Row>
                            <Row className="my-2">
                                <Form.Group as={Col} controlId="inputFirstName">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control 
                                        as='input'
                                        type="date"
                                        value={this.state.dateInput} 
                                        onChange={(evt) => {this.setState({dateInput : evt.target.value})}}
                                        isValid={this.state.errors.dateInput !== null}
                                        isInvalid={this.state.errors.dateInput}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="inputLastName">
                                    <Form.Label>Slug</Form.Label>
                                    <Form.Check 
                                        custom
                                        type='checkbox'
                                        id='cohort-graduated'
                                        label='Graduated'
                                        defaultChecked={this.state.graduated}
                                        onChange={() => {this.setState({graduated : !this.state.graduated})}}
                                    />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAddCohort}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    addCohort
}

export default connect(null, mapDispatchToProps)(AddCohortModal)