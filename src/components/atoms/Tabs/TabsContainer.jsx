// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import Tabs from './Tabs'
import { withRouter } from 'react-router'
import { compose, withHandlers, withStateHandlers } from 'recompose'

export const enhance = compose(
  withRouter,
  withStateHandlers(({ match }) => ({
    activeTab: match.params['item']
  }), {
    setActiveTab: () => (payload) => ({ activeTab: payload })
  }),
  withHandlers({
    handleClick: ({ onClick, setActiveTab }) => (tabName) => {
      onClick && onClick(tabName)
      setActiveTab(tabName)
    }
  })
)

export default enhance(Tabs)
