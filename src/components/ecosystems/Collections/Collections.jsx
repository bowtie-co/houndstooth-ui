
import React from 'react'
import { Col } from '../../atoms'
import { CollectionList, ItemList, ItemForm } from '../../organisms'

const Collections = (props) => {
  const { collections, items, defaultFields, activeItem, formSubmit, selectItem, match } = props
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
        activeItem={activeItem}
        defaultFields={defaultFields}
        formSubmit={formSubmit}
      />
    </Col>
  )
}

export default Collections
