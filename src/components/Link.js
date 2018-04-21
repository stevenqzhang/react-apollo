import React, { Component } from 'react'

class Link extends Component {
  render() {
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