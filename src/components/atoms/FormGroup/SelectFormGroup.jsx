import React from 'react'
import { FormGroup as FormGroupRS, FormText } from 'reactstrap'
import { Row, Col } from 'atoms'
import PropTypes from 'prop-types'

const SelectFormGroup = ({ id, label, title, errorMessage, helper, children, floatLabel = false, check = false, required }) => {
  return (
    <FormGroupRS style={{'margin': '0'}}>
      <Row>
        <Col sm='auto' className='flex flex-center'>{label}</Col>
        <Col sm='6'>{children}</Col>
      </Row>
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
