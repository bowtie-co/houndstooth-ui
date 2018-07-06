
import React from 'react'
import { Col } from '../../atoms'
import { CollectionList, ItemList, ItemForm } from '../../organisms'

const Collections = (props) => {
  const { collections, items, setActiveItem, defaultFields, activeItem, formSubmit } = props
  return (
    <Col>
      <p>These are your collections:</p>
      <CollectionList collections={collections} />
      <ItemList 
        items={items} 
        setActiveItem={setActiveItem} 
        defaultFields={defaultFields} 
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
