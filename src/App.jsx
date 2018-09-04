import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import ViewerProfile from './ViewerProfile'
import OrganizationMembers from './OrganizationMembers'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/me' component={ViewerProfile} />
        <Route path='/organizations/:id' component={OrganizationMembers} />
      </Switch>
    )
  }
}

export default App
