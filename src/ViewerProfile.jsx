import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Api from './Api'
import ViwerProfile from './ViewerProfile.scss'

const FETCH_VIEWER = `
  {
    viewer {
      name
      avatarUrl
      url
      organizations(first: 5) {
        nodes {
          avatarUrl
          name
          url
        }
      }
      repositories(first: 6) {
        nodes {
          name
          url
          primaryLanguage {
            name
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
    console.log(this.state)
    const { viewer, repositories, organizations } = this.state
    
    return (
      <div className="viewer-profile">
        <div>
          <a className="viewer-name" href={viewer.url}><h1>{viewer.name}</h1></a>
          <img className="viewer-avatar" src={viewer.avatarUrl} />
        </div>
        <div className="flex-container">
          <h2 className="section-heading">{`${viewer.name}'s organizations`}</h2>
          {organizations.map(o => (
            <div className="tile">
              <img className="org-avatar" src={o.avatarUrl} />
              <h3><a href={o.url}>{o.name}</a></h3>
            </div>
          ))}
        </div>
        <div>
          <h2>{`${viewer.name}'s repos`}</h2>
          {repositories.map(r => (
            <div>
              <h3><a href={r.url}>{r.name}</a></h3>
              <p>{r.primaryLanguage.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ViewerProfile
