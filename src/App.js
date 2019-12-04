import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import { updateCohorts } from './redux/actions'

import { connect } from 'react-redux'
// import { * } from './actionCreators'

import Home from './pages/Home';
import List from './pages/List';

class App extends Component {
  componentDidMount() {

  }

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/auth/github' render={() => <Redirect to="/auth/github" />} exact/>
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

const mapStateToProps = state => ({ todos: state.todos })

export default connect(mapStateToProps)(App)

// export default App;
