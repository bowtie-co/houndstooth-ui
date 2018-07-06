import React from 'react'
import { Col, Button } from '../../atoms'

const CollectionList = (props) => {
  const { collections } = props
  return (
    <Col>
      {
        collections.map((col, i) => {
          return (
            <Button
              href={`${col}?file=new_item&create=true`}
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
