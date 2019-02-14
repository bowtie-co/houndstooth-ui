import { compose, withHandlers, withStateHandlers, withPropsOnChange } from 'recompose'
import RecursiveFields from './RecursiveFields'

// const isObject = (item) => item instanceof Object && !Array.isArray(item)

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
          pointer[k] = value === '' ? null : value
        } else {
          pointer = pointer[k]
        }
      }

      setFormData(formDataCopy)
    }
  }),
  withPropsOnChange(['fields'], ({ setFormData, fields }) => {
    setFormData(fields)
  })
)(RecursiveFields)
