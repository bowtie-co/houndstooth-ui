import Checkbox from './Checkbox'
import { compose, withHandlers } from 'recompose'

export default compose(
  withHandlers({
    handleChange: ({ value, name, onChange }) => (e) => {
      onChange({ target: { name, value: !JSON.parse(e.target.value) } })
    }
  })
)(Checkbox)
