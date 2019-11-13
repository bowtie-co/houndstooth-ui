
import React from 'react'
import {
  Button,
  Row,
  Col,
  Title
} from 'atoms'
import {
  ItemList,
  ItemForm,
  RecursiveFields
} from 'organisms'

export const Data = (props) => {
  const { items, selectItem, addNewItem, activeData, handleFormSubmit, permissions, ...rest } = props
  return (
    <section>
      <div className='data-section'>
        <RecursiveFields
          fields={activeData && activeData['fields'] ? activeData['fields'] : {}}
          onSubmit={handleFormSubmit}
          disabled={!permissions['push']}
          {...rest}
        />
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
        <p><em>This project does not have data files. Please edit files directly user the File Editor.</em></p>
        <Button href={`/${baseRoute}/dir?ref=${queryParams['ref']}`}>File Editor</Button>
      </Col>
    </Row>
  )
}

export const EmptyItem = (props) => {
  return (
    <div className='empty-item-wrapper'>
      <Title>Please select a data file to start. </Title>
    </div>

  )
}
