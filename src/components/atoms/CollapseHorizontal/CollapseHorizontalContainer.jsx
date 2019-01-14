import { compose, withStateHandlers } from 'recompose'
import CollapseHorizontal from './CollapseHorizontal'

export default compose(
  withStateHandlers({
    isCollapsed: false
  }, {
    toggleIsCollapsed: ({ isCollapsed }) => () => ({ isCollapsed: !isCollapsed })
  })
)(CollapseHorizontal)
