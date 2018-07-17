import React from 'react'
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

export default RecursiveFields
