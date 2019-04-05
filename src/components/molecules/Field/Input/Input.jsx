import React from 'react'
import { Input as InputRS } from 'reactstrap'
import {
  FormGroup,
  Icon
} from 'atoms'

const Input = (props) => {
  const { value, edited, className = '', cleanObjectsFromDom, clearable, ...rest } = props
  const { onChange } = rest
  const sanitizedProps = cleanObjectsFromDom(rest)
  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <div className='flex'>
        <InputRS value={value || ''} {...sanitizedProps} />
        {
          clearable && value !== null &&
          <span className='flex center' style={{ border: '1px solid #c2c2c2', borderLeft: 'none' }}>
            <Icon iconName='times' onClick={() => onChange({ target: { value: null } })} />
          </span>
        }
      </div>
    </FormGroup>
  )
}

export default Input
