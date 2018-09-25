import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Icon } from 'atoms'
import FieldGroup from './FieldGroup'

const RecursiveFields = (props) => {
  const { onSubmit, formData, fields, deleteItem, ...rest } = props
  return (
    <div>
      <Col>
        <FieldGroup fields={formData} {...rest} />
      </Col>
      <Row>
        <Col sm='6'>
          <Icon onClick={deleteItem} iconName='trash-alt' color='red' />
        </Col>
        <Col sm='6'>
          <Button onClick={() => onSubmit(formData)}>
            Submit
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
