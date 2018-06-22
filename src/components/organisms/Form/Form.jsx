import React from 'react'
import { Button } from '../../atoms'

const Form = ({ childrenWithExtraProp, onSubmit, formData }) => {
  return (
    <section>
      { childrenWithExtraProp }
      <Button label={'Submit'} onClick={() => onSubmit(formData)} />
    </section>
  )
}

export default Form
