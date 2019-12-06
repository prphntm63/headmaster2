import React, { Component } from 'react';
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

const Navbar = ({ user }) => (
    <React.Fragment>
      {!user ?
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <a className="navbar-brand">Headmaster II</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <div className="d-flex flex-row align-items-center linkstyle">
                        <img className="mr-2" src="./public/images/GitHub-mark.png" style="height:30px; width:30px;" />
                        <p className="my-0 py-0"> Login with Github</p>
                    </div>
                </div>
            </div>
        </nav>
        :
        <nav>
            <a className="navbar-brand">Headmaster II</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <div className="d-flex flex-row align-items-center linkstyle">
                        <a href="">Cohorts</a>
                        <a href="">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
      }
    </React.Fragment>
)

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(Navbar);