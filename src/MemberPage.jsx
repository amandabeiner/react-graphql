import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Api from './Api'

import RepoTile from './RepoTile'

const FETCH_MEMBER_INFO = `
  query fetchMemberInfo($memberLogin: String!
    $endCursor: String
  ) {
    user (login: $memberLogin){
      name
      avatarUrl

      repositories(first: 6 after: $endCursor) {
        totalCount
        nodes {
          name
          primaryLanguage {
            name
            color
          }
        }

        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

class MemberPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      repoCount: null,
      repos: [],
      user: {},
      pageInfo: {}
    }

    this.api = new Api()
    this.fetchUserInfo = this.fetchUserInfo.bind(this)
  }

  componentDidMount() {
    this.fetchUserInfo()
  }

  fetchUserInfo() {
    const { login } = this.props.match.params
    const { endCursor } = this.state.pageInfo
    
    this.api.fetch(FETCH_MEMBER_INFO, { memberLogin: login, endCursor })
      .then((res) => {
        const { user } = res.data
        this.setState({
          repoCount: user.repositories.totalCount,
          repos: user.repositories.nodes,
          user: user,
          pageInfo: user.repositories.pageInfo
        })
      })
  }

  render() {
    return (
      <div>
        <img src={this.state.user.avatarUrl} className="avatar" />
        <h1>{this.state.user.name} has {this.state.repoCount} repositories</h1>
        <div className="flex-container">
          {this.state.repos.map(r => (
            <RepoTile
              repo={r}
              key={r.name}
            />
          ))}
        </div>
        <button
          className="btn"
          onClick={this.fetchUserInfo}
        >
          See more repos
        </button>
      </div>
    )
  }
}

export default MemberPage
