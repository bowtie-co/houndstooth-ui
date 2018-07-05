
import React from 'react'
import { Col, PrivateRoute } from '../../atoms'
import { CollectionsList, ItemList } from '../../organisms'

const Collections = (props) => {
  const { collections, match } = props
  return (
    <Col>
     <p>These are your collections:</p>
      <CollectionsList collections={collections} url={match['url']} />
      <PrivateRoute
        props={props}
        path={`${match['url']}/:collection`}
        component={ItemList}
      />
    </Col>
  )
}

export default Collections
