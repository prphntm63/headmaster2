import React, { Component } from 'react';
import { Link, Redirect, withRouter, Route } from 'react-router-dom';
import UserInfo from './../components/UserInfo'
import Cohorts from './../components/Cohorts'
import NavbarComponent from '../components/NavbarComponent';


class Home extends Component {

  render() {
    return (
    <div className="App">
      {/* <NavbarComponent /> */}

      <Cohorts />
      
    </div>
    );
  }
}
export default withRouter(Home);