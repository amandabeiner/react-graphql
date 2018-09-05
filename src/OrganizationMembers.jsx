import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Api from './Api'

import styles from './styles.scss'

const FETCH_MEMBERS = `
  query fetchOrgMembers($orgLogin: String!
    $endCursor: String
  ) {
    organization(login: $orgLogin) {
      name 
      members(first: 5 after: $endCursor) {
        totalCount
        nodes {
          name
          login
          avatarUrl
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

class OrganizationMembers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memberCount: null,
      members: [],
      org: "",
      pageInfo: {}
    }

    this.api = new Api()
    this.fetchMembers = this.fetchMembers.bind(this)
    this.pushRoute    = this.pushRoute.bind(this)
  }

  componentDidMount() {
    this.fetchMembers()
  }

  fetchMembers() {
    const { login } = this.props.match.params
    const { endCursor } = this.state.pageInfo

    this.api.fetch(FETCH_MEMBERS, { orgLogin: login, endCursor })
      .then((res) => {
        this.setState({
          memberCount: res.data.organization.members.totalCount,
          org: res.data.organization.name,
          members: res.data.organization.members.nodes,
          pageInfo: res.data.organization.members.pageInfo
        })
      })
  }

  pushRoute(login) {
    this.props.history.push(`/members/${login}`)
  }

  render() {
    return (
      <div className="org-members">
        <h1>{this.state.org} has {this.state.memberCount} members</h1>
        <p>Showing {this.state.members.length} out of {this.state.memberCount}</p>
        <div className="flex-container">
          {this.state.members.map(m => (
            <div className="tile" onClick={() => { this.pushRoute(m.login)}} key={m.login}>
              <h3>{m.name}</h3>
              <img className="avatar" src={m.avatarUrl} />
              <p>{m.login}</p>
            </div>
          ))}
        </div>
          <button className="btn"
            onClick={this.fetchMembers}
          >
            See more members
          </button>
      </div>
    )
  }
}

export default OrganizationMembers
