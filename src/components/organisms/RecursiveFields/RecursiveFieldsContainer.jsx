import { compose, withHandlers, withStateHandlers, withPropsOnChange } from 'recompose'
import RecursiveFields from './RecursiveFields'

export default compose(
  withStateHandlers(({ fields }) => ({
    formData: fields,
    isDeleteModalOpen: false
  }), {
    setFormData: ({ formData }) => (payload) => ({ formData: payload }),
    toggleModal: ({ isDeleteModalOpen }) => () => ({ isDeleteModalOpen: !isDeleteModalOpen })
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
    },
    handleArrayChange: ({ setFormData, formData }) => (key, value) => {
      const regexArr = key.match(/\[(.*?)\](.)?/)
      const index = regexArr[1]
      const splitter = regexArr[0]
      const formKey = key.split(splitter)
      const [ parentKey, nestedKey ] = formKey
      const parentArray = [...formData[parentKey]]

      parentArray[index][nestedKey] = value

      const formDataCopy = Object.assign({}, formData, { [parentKey]: parentArray })
      setFormData(formDataCopy)
    }
  }),
  withPropsOnChange(['fields'], ({ setFormData, fields }) => {
    setFormData(fields)
  }),
  withPropsOnChange(['defaultFormData'], ({ setFormData, defaultFormData }) => {
    defaultFormData && setFormData(defaultFormData)
  })
)(RecursiveFields)
