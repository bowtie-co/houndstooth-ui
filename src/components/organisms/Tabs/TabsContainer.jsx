// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import Tabs from './Tabs'
import { withRouter } from 'react-router'
import { compose, withHandlers, withStateHandlers, withPropsOnChange } from 'recompose'

export const enhance = compose(
  withRouter,
  withStateHandlers(({ match }) => ({
    activeTab: match.params['item']
  }), {
    setActiveTab: () => (payload) => ({ activeTab: payload })
  }),
  withHandlers({
    handleClick: ({ onClick, setActiveTab }) => (tabName) => {
      const name = tabName === 'NEW FILE' ? 'new' : tabName
      onClick && onClick(name)
      setActiveTab(tabName)
    }
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab, tabs }) => {
    if (match.params['item'] === 'new') {
      if (tabs[0]['name'] !== 'NEW FILE') {
        tabs.unshift({ name: 'NEW FILE' })
      }
      setActiveTab('NEW FILE')
    } else {
      setActiveTab(match.params['item'])
    }
  })
)

export default enhance(Tabs)
