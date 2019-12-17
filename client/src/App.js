import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { updateCohorts, updateUser } from './redux/actions'
import store from './redux/store'

import { connect } from 'react-redux'
// import { * } from './actionCreators'

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
  
  // Check for login state on initial load
  componentDidMount() {

    fetch('/api/usercohorts', {
      method : 'GET'
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        console.log('Unauthorized')
        return null
      }
    })
    .then(serverResponse => {
      if (!serverResponse) return null
      
      if (serverResponse.user) {
        store.dispatch(updateUser(serverResponse.user))
        this.setState({
          user : serverResponse.user
        })
      } else (
        console.log('no user')
      )

      if (serverResponse.cohorts) {
        store.dispatch(updateCohorts(serverResponse.cohorts))
      } else {
        console.log('no cohorts')
      }
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
          <Route exact path='/' component={Home}/>
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

// const mapStateToProps = state => ({ 
//   user : state.user
// })

// const mapDispatchToProps = {
//   updateCohorts,
//   updateUser
// }

// export default connect(mapStateToProps)(App)

export default App

// export default App;
// export default connect(
//   null,
//   mapDispatchToProps
// )(App);