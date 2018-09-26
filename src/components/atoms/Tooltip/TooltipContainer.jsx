import { compose, withStateHandlers } from 'recompose'
import Tooltip from './Tooltip'

export default compose(
  withStateHandlers({
    tooltipOpen: false
  }, {
    toggleToolTip: ({ tooltipOpen }) => () => ({ tooltipOpen: !tooltipOpen })
  })
)(Tooltip)
