/* eslint-disable camelcase */
import React from 'react'

import { compose, withHandlers, withStateHandlers, withPropsOnChange } from 'recompose'
import RecursiveFields from './RecursiveFields'
import { FieldContainer } from '../../molecules'

// const isObject = (item) => item instanceof Object && !Array.isArray(item)

const buildFields = (fields, handleChange, location = '') => {
  const fieldKeys = Object.keys(fields)

  return fieldKeys.map((key, index) => {
    const field = fields[key]
    return buildField(key, index, field, handleChange, location)
  })
}

const buildField = (key, index, field, handleChange, location = '') => {
  const current_location = location === '' ? key : `${location}.${key}`
  const input_id = `field-${key}-${index}-input`

  if (Array.isArray(field)) {
    return (
      <div key={input_id}>
        <p>{key}</p>
      </div>
    )
  } else if (field && typeof field === 'object') {
    return (
      <div key={input_id}>
        <p>{key}</p>
        {
          buildFields(field, current_location)
        }
      </div>
    )
  } else {
    return (
      <div key={input_id} >
        <label htmlFor={input_id} >
          {key}
        </label>
        <FieldContainer
          // getUploadPreview={this.props.getUploadPreview}
          input_id={input_id}
          name={key}
          value={field}
          onChange={(e) => handleChange(current_location, e.target.value)}
        />

      </div>
    )
  }
}

export default compose(
  withStateHandlers(({ fields }) => ({
    formData: fields
  }), {
    setFormData: ({ formData }) => (payload) => ({ formData: payload })
  }),
  withHandlers({
    handleChange: ({ setFormData, formData }) => (key, value) => {
      const keys = key.split('.')
      const formDataCopy = Object.assign({}, formData)
      let pointer = formDataCopy

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]

        if (i === keys.length - 1) {
          pointer[k] = value
        } else {
          pointer = pointer[k]
        }
      }

      setFormData(formDataCopy)
    }
  }),
  withHandlers({
    renderFields: ({ formData, handleChange }) => () => buildFields(formData, handleChange)
  }),
  withPropsOnChange(['fields'], ({ setFormData, fields }) => {
    console.log('inside props on change', fields)
    setFormData(fields)
  })
)(RecursiveFields)
