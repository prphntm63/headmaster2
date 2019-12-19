import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';


class Home extends Component {
  loginHandler = () => {
    window.location.href = `${window.location.origin}/auth/github`;
  }

  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>
      {/* <Link to={'./auth/github'}>
        <button variant="raised">
            Login
        </button>
      </Link> */}

      <button onClick={this.loginHandler}>
          Login With Github
      </button>
      
    </div>
    );
  }
}
export default withRouter(Home);