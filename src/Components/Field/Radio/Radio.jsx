import React from 'react'
import { FormGroup, Label, Input, Row, Col } from 'reactstrap'

const RadioField = ({ id, label, validate, options, title, name, onChange, ...props }) => {
  return (
    <FormGroup>
      <Row>
        <Col>
          <FormGroup check className='customRadio'>
            <h2>{title || label}</h2>
            {options.map(option =>
              <Label check key={option.label}>
                <Input
                  id={id}
                  value={option.value}
                  type='radio'
                  name={name}
                  onChange={onChange}
                  checked={props.checked === option.value}
                />
                <i className='fa fa-circle-o fa-2x' /><i className='fa fa-dot-circle-o fa-2x' />
                <span>{option.label}</span>
              </Label>
            )}
          </FormGroup>
        </Col>
      </Row>
    </FormGroup>
  )
}

export default RadioField
