import React from 'react'
import { Form as FormRS } from 'reactstrap'

const FormBT = ({ childrenWithExtraProp, onSubmit, formData, ...rest }) => {
  return (
    <FormRS {...rest}>
      { childrenWithExtraProp }
    </FormRS>
  )
}

export default FormBT
