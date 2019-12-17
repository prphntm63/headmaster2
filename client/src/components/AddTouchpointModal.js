import React, { Component } from 'react';
import { Badge, Modal, Form, Button, Row, Col, InputGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import {connect} from 'react-redux'

import { addTouchpoint } from './../redux/actions'

class AddTouchpointModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow : false,
            stoplightStatusEntry : 'green',
            tagEntry: {
                text : '',
                status : 'green'
            },
            currentTags : [],
            commentEntry : '',
            errors : {
                stoplightStatusEntry : null,
                tagEntry : null,
                currentTags : null,
                commentEntry : null,
            }
        }
    }

    handleOpen = () => {
        fetch(`/api/students/${this.props.studentId}`)
        .then(studentData => {
            return studentData.json()
        })
        .then(studentJson => {
            this.setState({
                currentTags : studentJson.tags,
                stoplightStatusEntry : studentJson.stoplightStatus,
                modalShow : true
            })
        })
        .then(console.log(this.state))
    }

    handleClose = () => {
        this.setState({
            modalShow : false,
            stoplightStatusEntry : 'green',
            tagEntry: {
                text : '',
                status : 'green'
            },
            currentTags : [],
            commentEntry : '',
            errors : {
                stoplightStatusEntry : null,
                tagEntry : null,
                currentTags : null,
                commentEntry : null,
            }
        })
    }

    handleAddTouchpoint = () => {
        let studentId = this.props.studentId
        console.log('Add touchpoint here!')
    }

    removeTag = (evt) => {
        console.log('removed ', evt.target)
    }

    render() {

        return (
            <React.Fragment>
                {this.props.isStudentCard ?
                    (<div className="d-flex justify-content-center py-2 add-touchpoint-button">
                        <a href onClick={this.handleOpen}>Add Touchpoint</a>
                    </div>)
                :
                    (<Button variant="primary" value="addTouchpoint" onClick={this.handleOpen} className="ml-auto btn-lg px-2 py-0 mb-2">＋</Button>)
                }

                <Modal show={this.state.modalShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Touchpoint...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row className="my-2">
                                <Form.Group as={Col} sm={4} controlId="inputGithub">
                                    <Form.Label>Stoplight Status</Form.Label>
                                    <ButtonToolbar>
                                        <ToggleButtonGroup className="stoplightStatus" type="radio" name="stoplightButtons" value={this.state.stoplightStatusEntry} onChange={state => {this.setState({stoplightStatusEntry : state})}}>
                                            <ToggleButton value={'green'} variant="success"><i className="material-icons pt-1">done</i></ToggleButton>
                                            <ToggleButton value={'yellow'} variant="warning"><i className="material-icons pt-1">help_outline</i></ToggleButton>
                                            <ToggleButton value={'red'} variant="danger"><i className="material-icons pt-1">warning</i></ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                    <Form.Control.Feedback type="invalid">{this.state.errors.stoplightStatusEntry ? this.state.errors.stoplightStatusEntry : ''}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm={8} controlId="inputGithub">
                                    <Form.Label>Github Profile</Form.Label>
                                    <InputGroup>
                                        <ButtonToolbar as={InputGroup.Prepend}>
                                            <ToggleButtonGroup className="stoplightStatus" type="radio" name="stoplightButtons" value={this.state.tagEntry.status} onChange={state => {this.setState({tagEntry : {...this.state.tagEntry, state:state}})}}>
                                                <ToggleButton value={'green'} variant="success"><i className="material-icons pt-1">done</i></ToggleButton>
                                                <ToggleButton value={'yellow'} variant="warning"><i className="material-icons pt-1">help_outline</i></ToggleButton>
                                                <ToggleButton value={'red'} variant="danger"><i className="material-icons pt-1">warning</i></ToggleButton>
                                            </ToggleButtonGroup>
                                        </ButtonToolbar>
                                        <Form.Control 
                                            type="input" 
                                            placeholder="Add Tag" 
                                            value={this.state.tagEntry.text} 
                                            onChange={value => {this.setState({tagEntry : {...this.state.tagEntry, text:value}})}} 
                                            isValid={this.state.errors.tagEntry !== null}
                                            isInvalid={this.state.errors.tagEntry}></Form.Control>
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary">＋</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    {this.state.currentTags.map(tag => {
                                        return (<Badge variant={getBadgeClassFromStatus(tag.status)} className="mr-auto my-1">
                                            {tag.text}
                                            <span className="delete-tag linkstyle" onclick={this.removeTag}>
                                                <i className="material-icons">cancel</i>
                                            </span>
                                        </Badge>)
                                    })}
                                    <Form.Control.Feedback type="invalid">{this.state.errors.tagEntry ? this.state.errors.tagEntry : ''}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="my-2">
                                <Form.Group as={Col} controlId="inputFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="textarea" 
                                        placeholder="Comments..." 
                                        value={this.state.commentEntry} 
                                        onChange={(evt) => {this.setState({commentEntry : evt.target.value})}}
                                        isValid={this.state.errors.commentEntry !== null}
                                        isInvalid={this.state.errors.commentEntry}></Form.Control>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAddTouchpoint}>
                            Add Touchpoint
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    addTouchpoint
}

export default connect(null, mapDispatchToProps)(AddTouchpointModal)

function getBadgeClassFromStatus(status) {
    let badgeClass = ''
            switch (status) {
                case 'green':
                    badgeClass = 'success'
                    break;
                case 'yellow':
                    badgeClass = 'warning'
                    break;
                case 'red':
                    badgeClass = 'danger'
                    break;
                default:
                    badgeClass = 'success'
            }
    return badgeClass
}