/* eslint-env mocha */
/* global expect jest */

import React from 'react'
// import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Title, Row, Col } from 'atoms'
import { FieldContainer } from 'molecules'
import FormContainer from './FormContainer'
import Form from './Form'

describe('Form', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FormContainer />).until(Form)
    expect(wrapper.find(Form).length).toBe(1)
  })

  it('should give children extra props and bind to formData', () => {
    const wrapper = shallow(<FormContainer><FieldContainer type={'text'} label={'text input'} name={'Text Input'} /></FormContainer>).until(Form)
    const childProps = wrapper.props().children.props
    const childExtraProps = wrapper.props().childrenWithExtraProp[0].props

    expect(childProps).toEqual({ type: 'text', label: 'text input', name: 'Text Input' })
    expect(childExtraProps).toHaveProperty('value')
    expect(childExtraProps).toHaveProperty('onChange')
    expect(childExtraProps).toHaveProperty('type')
    expect(childExtraProps).toHaveProperty('label')
    expect(childExtraProps).toHaveProperty('errors')
  })

  it('should give NOT give a child extra props without a name prop.', () => {
    const wrapper = shallow(<FormContainer><Title title={'This is a title'} /></FormContainer>).until(Form)
    const childProps = wrapper.props().children.props
    const childExtraProps = wrapper.props().childrenWithExtraProp[0].props

    expect(childProps).toEqual({ title: 'This is a title' })
    expect(childExtraProps).toHaveProperty('title')
    expect(childExtraProps).not.toHaveProperty('value')
    expect(childExtraProps).not.toHaveProperty('onChange')
    expect(childExtraProps).not.toHaveProperty('type')
    expect(childExtraProps).not.toHaveProperty('label')
    expect(childExtraProps).not.toHaveProperty('errors')
  })

  it('should give a nested FieldContainer child extra props.', () => {
    const wrapper = shallow(
      <FormContainer>
        <Row sm='12'>
          <Col>
            <FieldContainer type={'text'} label={'text input'} name={'Text Input'} />
          </Col>
        </Row>
      </FormContainer>
    ).until(Form)

    const inputWithExtraProps = wrapper.props().childrenWithExtraProp[0].props.children[0].props.children[0].props
    const rowWithExtraProps = wrapper.props().childrenWithExtraProp[0].props

    expect(inputWithExtraProps).toHaveProperty('type')
    expect(inputWithExtraProps).toHaveProperty('label')
    expect(inputWithExtraProps).toHaveProperty('name')
    expect(inputWithExtraProps).toHaveProperty('value')
    expect(inputWithExtraProps).toHaveProperty('onChange')
    expect(inputWithExtraProps).toHaveProperty('errors')

    expect(rowWithExtraProps).toHaveProperty('sm')
    expect(rowWithExtraProps).not.toHaveProperty('type')
    expect(rowWithExtraProps).not.toHaveProperty('label')
    expect(rowWithExtraProps).not.toHaveProperty('value')
    expect(rowWithExtraProps).not.toHaveProperty('onChange')
    expect(rowWithExtraProps).not.toHaveProperty('errors')
  })

  it('onChange of input should trigger handler', () => {
    const onChangeEvent = jest.fn()
    const wrapper = shallow(<FormContainer><FieldContainer type={'text'} label={'text input'} name={'text_input_1'} onChange={onChangeEvent} /></FormContainer>).until(Form)
    const textInput = wrapper.find(FieldContainer)
    textInput.simulate('change', { target: { value: 'this is a value' } })
    expect(onChangeEvent).toBeCalled()
  })

  // it('should update formData onChange of input', () => {
  //   const wrapper = shallow(<FormContainer><FieldContainer type={'text'} label={'text input'} name={'text_input_1'} /></FormContainer>).until(Form)
  //   console.log('wrapper.getElement()', wrapper.getElement().props.setFormData)
  //   wrapper.getElement().props.setFormData({ target: { value: 'this is a value' } })
  //   expect(wrapper.props().formData).toHaveProperty('value', 'this is a value')
  // })
})
