import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {
  componentDidMount() {
    this._subscribeToNewLinks()
  }

  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>
    }

    const linksToRender = this._getLinksToRender()

    return (
      <div>
        <div>
          {linksToRender.map((link, index) => (
            <Link
              key={link.id}
              index={index}
              link={link}
            />
          ))}
        </div>
      </div>
    )
  }

  _getLinksToRender = () => {
    return this.props.feedQuery.feed.links
  }

  _subscribeToNewLinks = () => {
    this.props.feedQuery.subscribeToMore({
      document: gql`
        subscription {
          newLink {
            node {
              id
              url
              description
              createdAt
              postedBy {
                id
                name
              }
              votes {
                id
                user {
                  id
                }
              }
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllLinks = [
          subscriptionData.data.newLink.node,
          ...previous.feed.links,
        ]
        const result = {
          ...previous,
          feed: {
            links: newAllLinks,
          },
        }
        return result
      },
    })
  }
}

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      count
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export default graphql(FEED_QUERY, {
  name: 'feedQuery',
})(LinkList)
