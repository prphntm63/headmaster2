import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import { updateCohorts, updateUser } from './redux/actions'

import { connect } from 'react-redux'
// import { * } from './actionCreators'

import Home from './pages/Home';
import List from './pages/List';

class App extends Component {
  
  // Check for login state on initial load
  componentDidMount() {
    console.log('component mounted')

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
        console.log('Got User - ', serverResponse.user)
        this.props.dispatch(updateUser(serverResponse.user))
      } else (
        console.log('no user')
      )

      if (serverResponse.cohorts) {
        console.log(serverResponse.cohorts)
        this.props.dispatch(updateCohorts(serverResponse.cohorts))
      } else {
        console.log('no cohorts')
      }
    })
  }

  render() {
    const handleAuthCallback = () => {
      let currentUrl = window.location.href
      let callbackCode = currentUrl.split("?")[1]
      console.log(callbackCode)

      window.location.href = `http://localhost:5000/auth/github/callback?${callbackCode}`;

      return (<div></div>)
    }

    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/auth/github/callback' render={handleAuthCallback} exact/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({ cohorts: state.cohorts })

// const mapDispatchToProps = {
//   updateCohorts,
//   updateUser
// }

export default connect(mapStateToProps)(App)

// export default App;
// export default connect(
//   null,
//   mapDispatchToProps
// )(App);