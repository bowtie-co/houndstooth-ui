
import React from 'react'
import { Col } from '../../atoms'
import { CollectionList, ItemList, ItemForm } from '../../organisms'

const Collections = (props) => {
  const { collections, items, setActiveItem, fields, activeItem } = props
  return (
    <Col>
      <p>These are your collections:</p>
      <CollectionList collections={collections} />
      <ItemList items={items} setActiveItem={setActiveItem} />
      <ItemForm activeItem={activeItem} fields={fields} />
    </Col>
  )
}

export default Collections
