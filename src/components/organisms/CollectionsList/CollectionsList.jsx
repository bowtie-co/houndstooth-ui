import React from 'react'
import { Col, Button } from '../../atoms'

const CollectionsList = (props) => {
  const { collections, url } = props
  return (
    <Col>
      {
        collections.map((col, i) => {
          return (
            <Button
              href={`${url}/${col}`}
              key={i}>
              {col}
            </Button>
          )
        })
      }
    </Col>
  )
}

export default CollectionsList
