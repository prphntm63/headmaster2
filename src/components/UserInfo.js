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

const UserInfo = ({ user }) => (
    <div>
      {user ?
        <div>
          <h3>{user.firstName} {user.lastName}</h3>
          <img src={user.photoUrl} alt=""/>
        </div>
        :
        <h3>"No User"</h3>
      }
    </div>
)

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(UserInfo);