
import React from 'react'
import { Button, Col } from '../../atoms'

const Collections = (props) => {
  const { collections } = props
  return (
    <Col>
     These are your collections:
      {
        collections.map((col, i) => {
          return (
            <Button
              href={`${col}`}
              key={i}>
              {col}
            </Button>
          )
        })
      }
    </Col>
  )
}

export default Collections
