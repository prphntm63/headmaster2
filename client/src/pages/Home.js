import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import UserInfo from './../components/UserInfo'
import Cohorts from './../components/Cohorts'
import NavbarComponent from '../components/NavbarComponent';


class Home extends Component {

  render() {
    return (
    <div className="App">
      <NavbarComponent />
      <h1>Project Home</h1>
      <UserInfo />

      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>

      <Link to={'./auth/github'}>
        <button varieant="raised">
            Login With Github
        </button>
      </Link>

      <Cohorts />
      
    </div>
    );
  }
}
export default withRouter(Home);