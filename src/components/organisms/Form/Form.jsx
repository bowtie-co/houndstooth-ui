import React from 'react'
import { Form as FormRS } from 'reactstrap'

const FormBT = ({ childrenWithExtraProp, onSubmit, formData, ...rest }) => {
  return (
    <FormRS
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData, e)
      }}
      {...rest}>
      {childrenWithExtraProp}
    </FormRS>
  )
}

export default FormBT
