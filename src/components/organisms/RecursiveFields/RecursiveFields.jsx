import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Icon } from 'atoms'
import FieldGroup from './FieldGroup'

const RecursiveFields = (props) => {
  const { onSubmit, formData, fields, deleteItem, ...rest } = props
  return (
    <div>
      <Row>
        <Col>
          <FieldGroup fields={formData} {...rest} />
        </Col>
      </Row>
      <Row style={{ 'padding': '20px 0px 15px 5px' }}>
        <Col className='flex align-center justify-content-start' sm='6'>
          <Icon onClick={deleteItem} iconName='trash-alt' color='grey' size='sm' tooltip='Delete file' placement='top' />
        </Col>
        <Col className='flex align-center justify-content-end' sm='6'>
          <Button onClick={() => onSubmit(formData)}>
            Save
          </Button>
        </Col>

      </Row>

    </div>
  )
}

RecursiveFields.propTypes = {
  formData: PropTypes.object.isRequired,
  fields: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default RecursiveFields
