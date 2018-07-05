import { withState, withHandlers, compose } from 'recompose'
import ColorPicker from './ColorPicker'

export default compose(
  withState('open', 'handleToggle', false),
  withHandlers({
    toggleState: ({ handleToggle, open }) => handleToggle(!open),
    handleClose: ({ handleToggle, open }) => handleToggle(false),
    handleColorChange: ({ fieldKey, field, handleChange }) => (color) => {
      if (color.rgb.a !== 1) {
        handleChange(fieldKey, `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
      } else {
        if (field && field.includes('#')) {
          handleChange(fieldKey, `#${color.hex}`)
        } else {
          handleChange(fieldKey, `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`)
        }
      }
    }
  })
)(ColorPicker)
