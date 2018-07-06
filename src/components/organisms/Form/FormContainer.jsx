import React from 'react'

import { compose, withHandlers, withState, withProps, withPropsOnChange } from 'recompose'
import Form from './Form'

const isObject = (item) => item instanceof Object && !Array.isArray(item)

export default compose(
  withState('formData', 'setFormData', {}),
  withState('errors', 'handleErrors', {}),
  withHandlers({
    formOnChange: ({ formData, setFormData, handleChange }) => (e) => {
      const key = e.target.name
      let value = e.target.value

      if (e.target.type === 'checkbox') {
        value = e.target.checked
      } else if (e.target.type === 'select-multiple') {
        const selected = []

        for (let i = 0; i < e.target.options.length; i++) {
          if (e.target.options[i].selected) {
            selected.push(e.target.options[i].value)
          }
        }
        value = selected
      }

      const newData = Object.assign({}, formData, { [key]: value })

      if (typeof handleChange === 'function') {
        handleChange(e, newData)
      }
      setFormData(newData)
    },
    getErrors: ({ errors }) => (key) => {
      // Responsible for getting errors for a specific field and passing it down into FieldContainer.
      if (key) {
        return errors[key] || []
      } else {
        return errors
      }
    }
  }),
  withProps(({ children, formOnChange, formData, ...rest }) => {
    const childrenWithExtraProp = React.Children.map(children, child => {
      return React.cloneElement(child, {
        value: formData[child.props.name] !== null ? formData[child.props.name] : '',
        onChange: formOnChange
      })
    })

    return { childrenWithExtraProp }
  }),
  withPropsOnChange(['model'], ({ setFormData, model, formData }) => {
    if(isObject(model)){
      setFormData(model)
    } else {
      console.error('model passed into Form component must be an object')
    } 
  })
)(Form)
