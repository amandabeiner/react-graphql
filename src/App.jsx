import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import ViewerProfile from './ViewerProfile'
import OrganizationMembers from './OrganizationMembers'
import MemberPage from './MemberPage'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path='/me' component={ViewerProfile} />
          <Route path='/organizations/:login' component={OrganizationMembers} />
          <Route path='/members/:login' component={MemberPage} />
          <Redirect from='/' to='/me' />
        </Switch>
      </div>
    )
  }
}

export default App
