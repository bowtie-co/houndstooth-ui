
import React from 'react'
import PropTypes from 'prop-types'
import {
  Col
} from 'atoms'
import {
  CollectionList,
  ItemList,
  ItemForm
} from 'organisms'

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

Collections.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.array,
  selectItem: PropTypes.func.isRequired
}

export default Collections
