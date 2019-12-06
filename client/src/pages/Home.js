import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Navbar from './../components/Navbar'
import UserInfo from './../components/UserInfo'
import Cohorts from './../components/Cohorts'


class Home extends Component {
  loginHandler = () => {
    window.location.href = `http://localhost:5000/auth/github`;
    console.log('Auth Call')
    // fetch('/auth/github', {
    //   method : "POST"
    // })
  }

  render() {
    return (
    <div className="App">
      <Navbar />
      <h1>Project Home</h1>
      <UserInfo />

      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>

      <button onClick={this.loginHandler}>
          Login With Github
      </button>

      <Cohorts />
      
    </div>
    );
  }
}
export default withRouter(Home);