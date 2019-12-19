import React, { Component } from 'react';
import { Link, Redirect, withRouter, Route } from 'react-router-dom';
import Cohorts from './../components/Cohorts'

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