import React, { Component, useReducer } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { updateCohorts, updateUser } from './redux/actions'
import store from './redux/store'

import { connect } from 'react-redux'
// import { * } from './actionCreators'

import Login from './pages/Login'
import Home from './pages/Home';
import Cohort from './pages/Cohort';
import Student from './pages/Student';
import NavbarComponent from './components/NavbarComponent';

const userLogoutState = {
  accessToken: "",
  ctime: "",
  firstName: "",
  github: "",
  id: null,
  lastName: "",
  mtime: "",
  photoUrl: "",
  refreshToken: null,
  superuser: null
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null
    }
  }
  
  componentDidMount() {
    // Check if user exists in state. If so, populate cohorts
  }

  handleLogin = () => {
    const githubUsername = window.prompt('Please enter your github username', 'prphntm63')

    fetch('https://api.github.com/users/'+githubUsername)
    .then(response => {
        return response.json()
    })
    .then(userJSON => {
      if (!userJSON.login) {
        window.alert(`${githubUsername} is not a valid Github username`)
      }
        
      let user = {
        id : githubUsername,
        github : githubUsername,
        superuser : 'superadmin'
      }

      if (userJSON.avatar_url) {
        user.photoUrl = userJSON.avatar_url
      }

      if (userJSON.name) {
        user.firstName = userJSON.name.split(' ').slice(0,1)[0]
        user.lastName = userJSON.name.split(' ').slice(1).join(' ')
      }

      return user
    })
    .then(user => {

      if (!user) return null

      this.setState({
        user : {
          firstName : user.firstName,
          lastName : user.lastName,
          github : user.githHub,
          superuser : user.superadmin,
          photoUrl : user.photoUrl
        }
      })

      store.dispatch(updateUser(user))
    })
  }

  handleLogout = () => {
    window.location.href = `http://localhost:5000/logout`
    store.dispatch(updateUser(userLogoutState))
    this.setState({
      user : null
    })
    console.log('Logout')
  }

  render() {
    const handleAuthCallback = () => {
      let currentUrl = window.location.href
      let callbackCode = currentUrl.split("?")[1]
      console.log(callbackCode)

      window.location.href = `http://localhost:5000/auth/github/callback?${callbackCode}`;

      return (<div></div>)
    }

    const loginHandler = () => {
      window.location.href = `http://localhost:5000/auth/github`;
      console.log('Auth Call')
    }

    const App = () => (
      <BrowserRouter>
        <NavbarComponent />
        <Switch>
          <Route exact path='/' >{this.state.user ? <Home /> : <Login handleLogin={this.handleLogin}/>}</Route>
          <Route path='/auth/github' render={loginHandler} exact />
          <Route path='/auth/github/callback' render={handleAuthCallback} exact/>
          <Route path='/logout' render={this.handleLogout} exact />
          <Route path='/students/*'>{this.state.user ? <Student /> : <Redirect to="" />}</Route>
          <Route path='/*'>{this.state.user ? <Cohort /> : <Redirect to="" />}</Route>
        </Switch>
      </BrowserRouter>
    )

    return (
      <App/>
    );
  }
}

export default App