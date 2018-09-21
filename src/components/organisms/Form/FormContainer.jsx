import React from 'react'
import { compose, withHandlers, withState, withProps } from 'recompose'
import FormBT from './Form'

export default compose(
  withState('formData', 'setFormData', {}),
  withHandlers({
    formOnChange: ({ formData, setFormData, handleChange, onSubmit, autoUpdate = false }) => (e) => {
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

      if (e.target.revert === true && typeof newData[key] !== 'undefined') {
        delete newData[key]
      }

      if (typeof handleChange === 'function') {
        handleChange(e, newData)
      }
      setFormData(newData)
      autoUpdate && onSubmit(newData)
    },
    getErrors: ({ formErrors = {} }) => (key) => {
      // Responsible for getting errors for a specific field and passing it down into FieldContainer.
      if (key) {
        return formErrors[key] || []
      } else {
        return formErrors
      }
    }
  }),
  withProps(({ children, formOnChange, formData, getErrors, editableModel = {}, onSubmit, disabled = false, ...rest }) => {
    // editableModel is not able to default to {}, which is why we are assigning defaultModelObj
    const defaultModelObj = editableModel || {}
    const mapFieldsWithProps = (children) => {
      return React.Children.map(children, child => {
        if (child && child.props && child.props.name) {
          if (child.props.name === 'submitBtn') {
            return React.cloneElement(child, {
              onClick: (e) => onSubmit(formData, e)
            })
          } else {
            return React.cloneElement(child, {
              value: Object.keys(formData).includes(child.props.name) ? formData[child.props.name] : defaultModelObj[child.props.name],
              onChange: formOnChange,
              errors: getErrors(child.props.name),
              disabled
            })
          }
        } else if (child && child.props && child.props.children) {
          return React.cloneElement(child, {
            children: mapFieldsWithProps(child.props.children)
          })
        }
        return child
      })
    }
    return {
      childrenWithExtraProp: mapFieldsWithProps(children)
    }
  })
)(FormBT)
