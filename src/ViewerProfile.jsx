import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Api from './Api'

import RepoTile from  './RepoTile'
import styles from './styles.scss'

const FETCH_VIEWER = `
  query findViewer {
    viewer {
      name
      avatarUrl
      url
      organizations(first: 5) {
        nodes {
          avatarUrl
          name
          url
          login
          members {
            totalCount
          }
        }
      }
      repositories(first: 6) {
        nodes {
          name
          url
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`

class ViewerProfile extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      viewer: {},
      repositories: [],
      organizations: []
    }

    this.api = new Api()
  }

  componentDidMount() {
    this.api.fetch(FETCH_VIEWER)
      .then((res) => {
        this.setState({
          viewer: res.data.viewer,
          repositories: res.data.viewer.repositories.nodes,
          organizations: res.data.viewer.organizations.nodes
        })
      })
  }

  render() {
    const { viewer, repositories, organizations } = this.state
    
    return (
      <div className="viewer-profile">
        <div>
          <a className="viewer-name" href={viewer.url}><h1>{viewer.name}</h1></a>
          <img className="avatar" src={viewer.avatarUrl} />
        </div>
        <div className="flex-container">
          <h2 className="section-heading">{`${viewer.name}'s organizations`}</h2>
          {organizations.map(o => (
            <div className="tile org-tile">
              <img className="avatar" src={o.avatarUrl} />
              <h3><a href={o.url}>{o.name}</a></h3>
              <p>
                <Link to={`/organizations/${o.login}`}>
                  View {o.members.totalCount} members
                </Link>
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2>{`${viewer.name}'s repos`}</h2>
          <div className="flex-container">
            {repositories.map(r => (
              <RepoTile
                repo={r}
                key={r.name}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ViewerProfile
