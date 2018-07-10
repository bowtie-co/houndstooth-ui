
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
  const { collections, items, activeItem, handleFormSubmit, selectItem, match, editFileName, handleMarkdownChange } = props
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
        handleFormSubmit={handleFormSubmit}
        handleMarkdownChange={handleMarkdownChange}
      />
    </Col>
  )
}

export default Collections
