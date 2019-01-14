import React from 'react'
import { FormGroup as FormGroupRS, FormText } from 'reactstrap'
import PropTypes from 'prop-types'

const SelectFormGroup = ({ id, label, title, errorMessage, helper, children, horizontal = false, floatLabel = false, check = false, required }) => {
  return (
    <FormGroupRS style={{ 'margin': '0' }}>
      <div className={`flex-${horizontal ? 'row' : 'col'}`}>
        {label && <div sm='auto' className='flex flex-center  select-form-group-container'>{label}</div> }
        {children}
      </div>
      <FormText>
        {errorMessage}
      </FormText>
    </FormGroupRS>
  )
}
SelectFormGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  helper: PropTypes.string,
  floatLabel: PropTypes.bool,
  check: PropTypes.bool,
  required: PropTypes.bool
}

export default SelectFormGroup
