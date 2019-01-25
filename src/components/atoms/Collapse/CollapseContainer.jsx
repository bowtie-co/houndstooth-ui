import { compose, withStateHandlers } from 'recompose'
import Collapse from './Collapse'

export default compose(
  withStateHandlers({
    tooltipOpen: false
  }, {
    toggleToolTip: ({ tooltipOpen }) => () => ({ tooltipOpen: !tooltipOpen })
  })
)(Collapse)
