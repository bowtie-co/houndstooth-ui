import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col } from 'atoms'
import FieldGroup from './FieldGroup'

const RecursiveFields = (props) => {
  const { onSubmit, formData, fields, ...rest } = props
  return (
    <div>
      <Col>
        <FieldGroup fields={formData} {...rest} />
      </Col>
      <Button onClick={() => onSubmit(formData)}>
        Submit
      </Button>
    </div>
  )
}

RecursiveFields.propTypes = {
  formData: PropTypes.object.isRequired,
  fields: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default RecursiveFields
