
import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Row,
  Col,
  Title
} from 'atoms'
import {
  ItemList,
  ItemForm
} from 'organisms'

export const Collections = (props) => {
  const { items, selectItem, addNewItem, ...rest } = props
  return (
    <section>
      <div className='collections-section'>
        <ItemList
          onClick={selectItem}
          items={items}
          vertical
          {...rest}
        >
          <ItemForm
            {...props}
          />

        </ItemList>
      </div>
    </section>
  )
}

/** *********** EMPTY STATE ********************/

export const EmptyState = (props) => {
  const { queryParams, baseRoute } = props
  return (
    <Row>
      <Col className='tab-content-card empty' sm='8' md='4'>
        <p><em>This project does not have collections. Please edit files directly user the File Editor.</em></p>
        <Button href={`/${baseRoute}/dir?ref=${queryParams['ref']}`}>File Editor</Button>
      </Col>
    </Row>
  )
}

export const EmptyItem = (props) => {
  return (
    <div className='empty-item-wrapper'>
      <Title>Please select a collection to start. </Title>
    </div>

  )
}

/** *********** PROPTYPES ********************/

Collections.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.array,
  selectItem: PropTypes.func.isRequired
}

// export default Collections
