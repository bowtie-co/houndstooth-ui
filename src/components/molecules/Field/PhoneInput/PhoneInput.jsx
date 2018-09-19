import React from 'react'
import { withFormatting } from 'helpers'
import { Input as InputRS } from 'reactstrap'
import { FormGroup } from 'atoms'

const PhoneInput = ({ value, formatPhoneNumber, edited, className = '', ...rest }) => {
  const { asYouType, asYouTypePhoneNumber, formatCurrency, formatExtLink, formatMessageUrl, parsePhoneNumber, setAsYouType, ...sanitizedProps } = rest
  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...sanitizedProps}>
      <InputRS value={value ? formatPhoneNumber(value) : ''} {...sanitizedProps} />
    </FormGroup>
  )
}

export default withFormatting(PhoneInput)
