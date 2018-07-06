import React from 'react'
import { Col, Button } from '../../atoms'

const CollectionList = (props) => {
  const { collections, match } = props
  const { username, repo } = match.params
  return (
    <Col>
      {
        collections.map((col, i) => {
          return (
            <Button
              href={`/repos/${username}/${repo}/collections/${col}`}
              key={i}>
              {col}
            </Button>
          )
        })
      }
    </Col>
  )
}

export default CollectionList
