import React  from 'react';
import { Dropdown, DropdownButton, Badge, Modal, Form, Button, Row, Col, InputGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
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
            console.log(studentData.status)
            return studentData.json()
        })
        .then(studentJson => {
            if (!studentJson) return

            this.setState({
                currentTags : studentJson.tags,
                stoplightStatusEntry : studentJson.stoplightStatus,
                modalShow : true
            })
        })

        return false
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

        fetch('/api/touchpoints', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'ctime' : new Date(),
                'student' : this.props.studentId,
                'stoplightStatus' : this.state.stoplightStatusEntry,
                'tags' : JSON.stringify(this.state.currentTags),
                'comment' : this.state.commentEntry
            })
        })
        .then(returnData => {
            return returnData.json()
        })
        .then(returnJSON => {
            this.props.addTouchpoint({
                studentId : returnJSON.student,
                touchpointData : {
                    id:returnJSON.id,
                    ctime: returnJSON.ctime,
                    student: returnJSON.student,
                    stoplightStatus: returnJSON.stoplightStatus,
                    comment: returnJSON.comment,
                    user: this.props.user.id,
                    userFirstName: this.props.user.firstName,
                    userLastName: this.props.user.lastName,
                    tags: returnJSON.tags
                }
            })
            this.handleClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleAddTag = () => {
        this.setState({
            currentTags : this.state.currentTags ? [...this.state.currentTags, {...this.state.tagEntry}] : [{...this.state.tagEntry}],
            tagEntry: {
                text : '',
                status : 'green'
            },
        })
    }

    removeTag = (tagText) => {
        this.setState({
            currentTags: this.state.currentTags.filter(tag => {return tag.text !== tagText})
        })
    }

    render() {

        return (
            <React.Fragment>
                {this.props.isStudentCard ?
                    (<div className="d-flex justify-content-center py-2 add-touchpoint-button">
                        <Button variant="link" onClick={this.handleOpen}>Add Touchpoint</Button>
                    </div>)
                :
                    (<Button variant="primary" value="addTouchpoint" onClick={this.handleOpen} className="ml-auto px-2 py-0 mb-2">Add Touchpoint</Button>)
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
                                        <DropdownButton
                                            as={InputGroup.Prepend}
                                            variant={'outline-' + getBadgeClassFromStatus(this.state.tagEntry.status)}
                                            title={this.state.tagEntry.status}
                                            // title = {getBadgeGlyphFromStatus(this.state.tagEntry.status)} 
                                        >
                                            <Dropdown.Item eventKey="green" onSelect={state => {this.setState({tagEntry : {...this.state.tagEntry, status:state}})}}>Green</Dropdown.Item>
                                            <Dropdown.Item eventKey="yellow" onSelect={state => {this.setState({tagEntry : {...this.state.tagEntry, status:state}})}}>Yellow</Dropdown.Item>
                                            <Dropdown.Item eventKey="red" onSelect={state => {this.setState({tagEntry : {...this.state.tagEntry, status:state}})}}>Red</Dropdown.Item>
                                        </DropdownButton>
                                        <Form.Control 
                                            type="input" 
                                            placeholder="Add Tag" 
                                            value={this.state.tagEntry.text} 
                                            onChange={evt => {this.setState({tagEntry : {...this.state.tagEntry, text:evt.target.value}})}} 
                                            isValid={this.state.errors.tagEntry !== null}
                                            isInvalid={this.state.errors.tagEntry}></Form.Control>
                                        <InputGroup.Append>
                                            <Button size="sm" variant="outline-secondary" onClick={this.handleAddTag}>＋</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    {this.state.currentTags ? 
                                    this.state.currentTags.map(tag => {
                                        return (<Badge key={tag.text} id={tag.text} variant={getBadgeClassFromStatus(tag.status)} className="mr-auto my-1">
                                            {tag.text}
                                            <span className="delete-tag linkstyle" onClick={(evt) => {this.removeTag(evt.target.parentNode.parentNode.getAttribute("id"))}}>
                                                <i className="material-icons">cancel</i>
                                            </span>
                                        </Badge>)
                                    })
                                    :
                                    (<div></div>)
                                    }
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