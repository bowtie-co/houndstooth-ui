import { compose, withHandlers, withState } from 'recompose'

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
  })
)
