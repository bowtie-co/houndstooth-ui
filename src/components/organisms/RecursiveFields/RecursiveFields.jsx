import React from 'react'
import { Button, Col } from '../../atoms'

const RecursiveFields = (props) => {
  const { renderFields, onSubmit, formData } = props
  return (
    <div>
      <Col>
        { renderFields() }
      </Col>
      <Button onClick={() => onSubmit(formData)}>
        Submit
      </Button>
    </div>
  )
}

export default RecursiveFields
