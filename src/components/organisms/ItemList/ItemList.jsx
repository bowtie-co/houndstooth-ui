import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Row,
  Subtitle,
  Button
} from '../../atoms'

const ItemList = (props) => {
  const { items, selectItem } = props
  return (
    <Col>
      <Row>
        <Button onClick={() => selectItem()} >New Item</Button>
        {
          items.map((item, i) => <Button key={i} onClick={() => selectItem(item)}>{item.name}</Button>)
        }
      </Row>
    </Col>
  )
}

/**********************************
EMPTY STATE
**********************************/

export const EmptyState = () => <Subtitle title={'You must select a collection'} />

/**********************************
PROP TYPES
**********************************/

ItemList.propTypes = {
  items: PropTypes.array,
  selectItem: PropTypes.func
}

export default ItemList
