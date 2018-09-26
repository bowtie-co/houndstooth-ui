
import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Icon,
  Row,
  Col
} from 'atoms'
import {
  Tabs,
  ItemForm
} from 'organisms'

export const Collections = (props) => {
  const { items, selectItem, addNewItem } = props
  return (
    <section>
      <div className='pointer' onClick={addNewItem}>
        <Icon iconName='plus-circle'/> Add File
      </div>
      <div className='collections-section'>
        <Tabs
          onClick={selectItem}
          tabs={items}
          vertical
        >
          <ItemForm
            {...props}
          />

        </Tabs>
      </div>
    </section>
  )
}

/** *********** EMPTY STATE ********************/

export const EmptyState = (props) => {
  const { queryParams, baseRoute } = props
  return (
    <Row>
      <Col className='tab-content-card' sm='4'>
      <div>This project does not have collections. Please edit files directly user the File Editor.</div>
      <Button href={`/${baseRoute}/dir?ref=${queryParams['ref']}`}>File Editor</Button>
    </Col>
    </Row>
  )
}

export const EmptyItem = (props) => {
  return (
    <Row>
      <Col className='tab-content-card' sm='4'>
        <div>Select an item from your collection</div>
      </Col>
    </Row>
  )
}

/** *********** PROPTYPES ********************/

Collections.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.array,
  selectItem: PropTypes.func.isRequired
}

// export default Collections
