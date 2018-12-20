import React from 'react'
import { compose, withHandlers, withState, withProps, withPropsOnChange } from 'recompose'
import FormBT from './Form'

export default compose(
  withState('formData', 'setFormData', ({ formData }) => formData || {}),
  withHandlers({
    isJson: () => (data) => {
      try {
        return JSON.parse(data)
      } catch (e) {
        return data
      }
    },
    formOnChange: ({ formData, setFormData, handleChange, onSubmit, autoUpdate = false, nested, name }) => (e) => {
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
      // else if (e.target.type === 'multi-doc') {
      //   value = formData[key] ? [...formData[key], value] : [value]
      // }

      const newData = Object.assign({}, formData, { [key]: value })

      // revert props will delete the key and value if value is empty
      if (e.target.revert === true && typeof newData[key] !== 'undefined') {
        delete newData[key]
      }

      // first if handles a nested form handleChange
      if (typeof handleChange === 'function' && nested && name) {
        handleChange({ target: { name, value: newData } })
      } else if (typeof handleChange === 'function' && !nested) {
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
  withProps(({ children, formOnChange, formData, getErrors, editableModel = {}, onSubmit, isJson, disabled = false, ...rest }) => {
    // editableModel is not able to default to {}, which is why we are assigning defaultModelObj
    const defaultModelObj = editableModel || {}
    const mapFieldsWithProps = (children) => {
      return React.Children.map(children, child => {
        if (child && child.props && child.props.name && child.props.nested) {
          return React.cloneElement(child, {
            handleChange: formOnChange,
            formData: Object.keys(formData).includes(child.props.name) ? isJson(formData[child.props.name]) : isJson(defaultModelObj[child.props.name]),
            defaultFormData: Object.keys(formData).includes(child.props.name) ? isJson(formData[child.props.name]) : isJson(defaultModelObj[child.props.name])
          })
        } else {
          if (child && child.props && child.props.name) {
            return React.cloneElement(child, {
              value: Object.keys(formData).includes(child.props.name) ? formData[child.props.name] : defaultModelObj[child.props.name],
              onChange: formOnChange,
              errors: getErrors(child.props.name),
              disabled: child.props['disabled'] || disabled
            })
          } else if (child && child.props && child.props.children && !child.props.nested) {
            return React.cloneElement(child, {
              children: mapFieldsWithProps(child.props.children)
            })
          }
        }

        return child
      })
    }
    return {
      childrenWithExtraProp: mapFieldsWithProps(children)
    }
  }),
  withPropsOnChange(['defaultFormData'], ({ setFormData, defaultFormData }) => {
    defaultFormData && setFormData(defaultFormData)
  })
)(FormBT)
