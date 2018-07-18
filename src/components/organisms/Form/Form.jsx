import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'atoms'

const Form = ({ childrenWithExtraProp, onSubmit, formData }) => {
  return (
    <section>
      { childrenWithExtraProp }
      <Button onClick={() => onSubmit(formData)}> Save </Button>
    </section>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  formData: PropTypes.object,
  childrenWithExtraProp: PropTypes.element.isRequired
}

export default Form
