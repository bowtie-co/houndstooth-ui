
import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Button
} from 'atoms'
import {
  CollectionList,
  ItemList,
  ItemForm
} from 'organisms'

export const Collections = (props) => {
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

/** *********** EMPTY STATE ********************/

export const EmptyState = (props) => {
  const { queryParams, baseRoute } = props
  return (
    <section>
      <div>This project does not have collections. Please edit files directly user the File Editor.</div>
      <Button href={`/${baseRoute}/dir?ref=${queryParams['ref']}`}>File Editor</Button>
    </section>
  )
}

Collections.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.array,
  selectItem: PropTypes.func.isRequired
}

// export default Collections
