import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import ViewerProfile from './ViewerProfile'
import OrganizationMembers from './OrganizationMembers'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path='/me' component={ViewerProfile} />
          <Route path='/organizations/:login' component={OrganizationMembers} />
          <Redirect from='/' to='/me' />
        </Switch>
      </div>
    )
  }
}

export default App
