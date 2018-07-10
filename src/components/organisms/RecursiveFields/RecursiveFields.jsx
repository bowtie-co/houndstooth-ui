import React from 'react'
import { Button, Col } from '../../atoms'
import FieldGroup from './FieldGroup'

const RecursiveFields = (props) => {
  const { fields, handleChange, onSubmit, formData } = props
  return (
    <div>
      <Col>
        <FieldGroup fields={fields} handleChange={handleChange} />
      </Col>
      <Button onClick={() => onSubmit(formData)}>
        Submit
      </Button>
    </div>
  )
}

export default RecursiveFields
