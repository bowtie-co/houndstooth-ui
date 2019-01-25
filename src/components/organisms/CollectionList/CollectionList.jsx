import React from 'react'
import PropTypes from 'prop-types'
import { Col, Button } from 'atoms'

const CollectionList = (props) => {
  const { collections, baseRoute } = props
  return (
    <Col>
      {
        collections.map((col, i) => {
          return (
            <Button
              href={`/${baseRoute}/collections/${col}`}
              key={i}>
              {col}
            </Button>
          )
        })
      }
    </Col>
  )
}

CollectionList.propTypes = {
  collections: PropTypes.array
}

export default CollectionList
