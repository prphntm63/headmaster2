import React, { Component } from 'react';
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

class AddStudentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            githubInput : '',
            firstnameInput : '',
            lastnameInput : '',
            photoUrl : '',
            modalShow : false,
            githubLookupTimeout : null
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

    handleGithubApiCall = (username) => {
        console.log('ToDo : github API call')
        this.setState({
            firstnameInput : 'firstname',
            lastnameInput : 'lastname',
            photoUrl : 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
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
            photoUrl : '',
            modalShow : false
        })
    }

    handleAddStudent = () => {
        console.log('Todo: add student - ', this.state.githubInput, this.state.firstnameInput, this.state.lastnameInput, this.state.photoUrl)
        this.handleClose()
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
                                    <img src={this.state.photoUrl ? this.state.photoUrl : '/images/noPhoto.png'} style={{width:'100%'}}/>
                                </Col>
                                <Form.Group as={Col} controlId="inputGithub">
                                    <Form.Label>Github Profile</Form.Label>
                                    <Form.Control type="input" placeholder="Github Username" onChange={this.handleGithubInput} onBlur={this.handleGithubApiCall}></Form.Control>
                                </Form.Group>
                                <Col className="pt-3">
                                    <small>Just the username, not the whole URL</small>
                                </Col>
                            </Row>
                            <Row className="my-2">
                                <Form.Group as={Col} controlId="inputFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="input" placeholder="First Name" onChange={(evt) => {this.setState({firstnameInput : evt.target.value})}}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="inputLastName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="input" placeholder="Last Name" onChange={(evt) => {this.setState({lastnameInput : evt.target.value})}}></Form.Control>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAddStudent}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default AddStudentModal