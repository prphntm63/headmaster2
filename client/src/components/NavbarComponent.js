import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import { connect } from "react-redux";

// const TodoList = ({ todos }) => (
//   <ul className="todo-list">
//     {todos && todos.length
//       ? todos.map((todo, index) => {
//           return <Todo key={`todo-${todo.id}`} todo={todo} />;
//         })
//       : "No todos, yay!"}
//   </ul>
// );

const NavbarComponent = ({ user }) => (
    <React.Fragment>
      {!user.id ?
        <Navbar bg="light" expand="lg">
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
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Headmaster II</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/cohorts">Cohorts</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        // <nav>
        //     <a className="navbar-brand">Headmaster II</a>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        //         <div className="navbar-nav ml-auto">
        //             <div className="d-flex flex-row align-items-center linkstyle">
        //                 <a href="">Cohorts</a>
        //                 <a href="">Logout</a>j
        //             </div>
        //         </div>
        //     </div>
        // </nav>
      }
    </React.Fragment>
)

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(NavbarComponent);