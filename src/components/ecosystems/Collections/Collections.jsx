
import React from 'react'
import {
  Col
} from '../../atoms'
import {
  CollectionList,
  ItemList,
  ItemForm
} from '../../organisms'

const Collections = (props) => {
  const { collections, match, items, selectItem, ...rest } = props
  return (
    <Col>
      <p>These are your collections:</p>
      <CollectionList
        collections={collections}
        match={match}
      />
      <ItemList
        items={items}
        selectItem={selectItem}
      />
      <ItemForm
        match={match}
        {...rest}
      />
    </Col>
  )
}

export default Collections
