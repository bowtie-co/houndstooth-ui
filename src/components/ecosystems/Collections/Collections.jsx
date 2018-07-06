
import React from 'react'
import { Col } from '../../atoms'
import { CollectionList, ItemList, ItemForm } from '../../organisms'

const Collections = (props) => {
  const { collections, items, activeItem, formSubmit, selectItem, match, editFileName } = props
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
        activeItem={activeItem}
        editFileName={editFileName}
        formSubmit={formSubmit}
      />
    </Col>
  )
}

export default Collections
