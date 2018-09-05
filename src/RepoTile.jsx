import React from 'react'
import PropTypes from 'prop-types'

const RepoTile = ({ repo }) => (
  <div className="tile repo-tile">
    <h3><a href={repo.url}>{repo.name}</a></h3>
      {repo.primaryLanguage && (
        <p>
          <i className="fa fa-circle" style={{ color: `${repo.primaryLanguage.color}`}} /> &nbsp;
          {repo.primaryLanguage.name}
        </p>
      )}
  </div>
)

export default RepoTile
