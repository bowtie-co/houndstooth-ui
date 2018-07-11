import { withState, withHandlers, compose } from 'recompose'
import ColorPicker from './ColorPicker'

export default compose(
  withState('open', 'handleToggle', false),
  withHandlers({
    toggleState: ({ handleToggle, open }) => () => handleToggle(!open),
    handleClose: ({ handleToggle }) => () => handleToggle(false),
    handleColorChange: ({ value, onChange }) => (color) => {
      if (color.rgb.a !== 1) {
        onChange({ target: { value: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})` } })
      } else {
        if (value && value.includes('#')) {
          onChange({ target: { value: `#${color.hex}` } })
        } else {
          console.log('color value ', color)
          onChange({ target: { value: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` } })
        }
      }
    }
  })
)(ColorPicker)
