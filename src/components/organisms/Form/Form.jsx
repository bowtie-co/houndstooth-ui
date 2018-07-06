import React from 'react'
import { Button } from '../../atoms'

const Form = ({ childrenWithExtraProp, onSubmit, formData }) => {
  return (
    <section>
      { childrenWithExtraProp }
      <Button onClick={() => onSubmit(formData)}> Save </Button>
    </section>
  )
}

export default Form
