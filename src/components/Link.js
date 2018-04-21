import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
        </div>
      </div>
    )
  }
}

export default Link