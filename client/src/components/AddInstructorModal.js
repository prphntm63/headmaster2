import React from 'react';
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import {connect} from 'react-redux'

import { addInstructor } from './../redux/actions'

class AddInstructorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            githubInput : '',
            firstnameInput : '',
            lastnameInput : '',
            roleInput : null,
            photoUrl : '',
            modalShow : false,
            githubLookupTimeout : null,
            errors : {
                githubInput : null,
                firstnameInput : null,
                lastnameInput : null,
                roleInput : null
            }
        }
    }

    handleGithubInput = (evt) => {
        if (this.state.githubLookupTimeout) {window.clearTimeout(this.state.githubLookupTimeout)}

        let timeoutVar = setTimeout(this.handleGithubApiCall, 5000)
        this.setState({
            githubInput : evt.target.value,
            githubLookupTimeout : timeoutVar
        })

    }

    handleGithubApiCall = () => {
        if (this.state.githubLookupTimeout) {window.clearTimeout(this.state.githubLookupTimeout)}

        fetch('https://api.github.com/users/'+this.state.githubInput)
        .then(response => {
            return response.json()
        })
        .then(responseJSON => {
            if(!responseJSON.login) {
                this.setState({
                    firstnameInput : '',
                    lastnameInput : '',
                    photoUrl : '',
                    errors : {
                        ...this.state.errors,
                        githubInput : `${this.state.githubInput} is not a valid Github username`
                    }
                })
            } else {
                this.setState({
                    errors : {
                        ...this.state.errors,
                        githubInput : false
                    }
                })
            }

            if (responseJSON.avatar_url) {
                this.setState({photoUrl : responseJSON.avatar_url})
            }

            if (responseJSON.name) {
                this.setState({
                    firstnameInput : responseJSON.name.split(' ').slice(0,1)[0],
                    lastnameInput : responseJSON.name.split(' ').slice(1).join(' ')
                })
            }
        })

        this.setState({
            githubLookupTimeout : null
        })
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
            roleInput : null,
            photoUrl : '',
            modalShow : false,
            githubLookupTimeout : null,
            errors : {
                githubInput : null,
                firstnameInput : null,
                lastnameInput : null,
                roleInput : null
            }
        })
    }

    handleAddInstructor = () => {
        
        fetch('/api/instructors', {
            method: 'POST',
            body: JSON.stringify({
                cohort : this.props.cohort.id,
                firstName : this.state.firstnameInput,
                lastName : this.state.lastnameInput,
                github : this.state.githubInput,
                role : this.state.roleInput,
                photoUrl : this.state.photoUrl
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
        .then(responseJSON => {
            this.props.addInstructor({
                cohortId : this.props.cohort.id,
                instructor : responseJSON
            })
            this.handleClose()
        })
        .catch(err => {
            if (err.status === 400) {
                err.json()
                .then(responseJson => {
                    console.log(responseJson)
                    window.alert(`Student failed to add! \n${responseJson.errors.map(error => {return error.field + ': ' + error.error + '\n'}).join('')}`)
                })
            } else {
                console.log('error adding instructor - ', err)
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
                        <Modal.Title>Add Student...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="my-2">
                                <Col sm={2} className='ml-1 px-0'>
                                    <img src={this.state.photoUrl ? this.state.photoUrl : '/images/noPhoto.png'} style={{width:'100%'}} alt="instructor headshot"/>
                                </Col>
                                <Form.Group as={Col} controlId="inputGithub">
                                    <Form.Label>Github Profile</Form.Label>
                                    <Form.Control 
                                        type="input" 
                                        placeholder="Github Username" 
                                        value={this.state.githubInput} 
                                        onChange={this.handleGithubInput} 
                                        onBlur={this.handleGithubApiCall}
                                        isValid={this.state.errors.githubInput !== null}
                                        isInvalid={this.state.errors.githubInput}></Form.Control>
                                    <Form.Control.Feedback type="invalid">{this.state.errors.githubInput ? this.state.errors.githubInput : ''}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} className="pt-3">
                                    <Form.Label>Example select</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        value={this.state.roleInput}
                                        onChange={(evt) => {this.setState({roleInput : evt.target.value})}}
                                        isValid={this.state.errors.roleInput !== null}
                                        isInvalid={this.state.errors.roleInput}
                                    >
                                        <option value={null} disabled>Select...</option>
                                        <option value="ta">TA</option>
                                        <option value="instructor">Instructor</option>
                                        <option value="admin">Admin</option>
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row className="my-2">
                                <Form.Group as={Col} controlId="inputFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="input" 
                                        placeholder="First Name" 
                                        value={this.state.firstnameInput} 
                                        onChange={(evt) => {this.setState({firstnameInput : evt.target.value})}}
                                        isValid={this.state.errors.firstnameInput !== null}
                                        isInvalid={this.state.errors.firstnameInput}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="inputLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type="input" 
                                        placeholder="Last Name" 
                                        value={this.state.lastnameInput} 
                                        onChange={(evt) => {this.setState({lastnameInput : evt.target.value})}}
                                        isValid={this.state.errors.lastnameInput !== null}
                                        isInvalid={this.state.errors.lastnameInput}></Form.Control>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAddInstructor}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    addInstructor
}

export default connect(null, mapDispatchToProps)(AddInstructorModal)