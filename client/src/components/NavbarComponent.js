import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { connect } from "react-redux";

const NavbarComponent = ({ user }) => (

    <React.Fragment>
      {!user.id ?
        <Navbar bg="light" expand="lg" style={{marginBottom : "20px"}}>
            <IndexLinkContainer to="/">
                <Navbar.Brand >Headmaster II</Navbar.Brand>
            </IndexLinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <IndexLinkContainer to="/">
                        <Nav.Link >Home</Nav.Link>
                    </IndexLinkContainer>
                    <LinkContainer to="/auth/github">
                        <Nav.Link>
                            <div className="d-flex flex-row align-items-center linkstyle">
                            <img className="mr-2" src="./images/GitHub-mark.png" style={{height:'30px', width:'30px'}} alt="github logo"/>
                                <p className="my-0 py-0"> Login with Github</p>
                            </div>
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        :
        <Navbar bg="light" expand="lg" style={{marginBottom : "20px"}}>
            <IndexLinkContainer to="/">
                <Navbar.Brand >Headmaster II</Navbar.Brand>
            </IndexLinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavDropdown title=
                        {<React.Fragment>
                            <img className="mr-2" src={user.photoUrl} style={{height:'30px', width:'30px', borderRadius:'50%'}} alt="user profile"/>
                            {user.firstName}
                        </React.Fragment>}
                     id="basic-nav-dropdown">
                        <IndexLinkContainer to="/">
                            <NavDropdown.Item>Home</NavDropdown.Item>
                        </IndexLinkContainer>
                        <LinkContainer to="/cohorts">
                            <NavDropdown.Item>Cohorts</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <LinkContainer to="/logout">
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      }
    </React.Fragment>
)

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(NavbarComponent);