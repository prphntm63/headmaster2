import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { connect } from "react-redux";

const NavbarComponent = ({ user }) => (

    <React.Fragment>
      {!user.id ?
        <Navbar bg="light" expand="lg" style={{marginBottom : "20px"}}>
            <Navbar.Brand href="/">Headmaster II</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/auth/github">
                        <div className="d-flex flex-row align-items-center linkstyle">
                        <img className="mr-2" src="./images/GitHub-mark.png" style={{height:'30px', width:'30px'}} />
                            <p className="my-0 py-0"> Login with Github</p>
                        </div>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        :
        <Navbar bg="light" expand="lg" style={{marginBottom : "20px"}}>
            <Navbar.Brand href="/">Headmaster II</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/cohorts">Cohorts</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                    <NavDropdown title=
                        {<React.Fragment>
                            <img className="mr-2" src={user.photoUrl} style={{height:'30px', width:'30px', borderRadius:'50%'}} />
                            {user.firstName}
                        </React.Fragment>}
                     id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Home</NavDropdown.Item>
                        <NavDropdown.Item href="/cohorts">Cohorts</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      }
    </React.Fragment>
)

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(NavbarComponent);