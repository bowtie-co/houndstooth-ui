// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import Tabs from './Tabs'
import { withRouter } from 'react-router'
import { compose, withHandlers, withStateHandlers, withPropsOnChange } from 'recompose'

export const enhance = compose(
  withRouter,
  withStateHandlers(({ match, tabs }) => ({
    tabs: tabs,
    activeTab: match.params['item']
  }), {
    setTabs: () => (payload) => ({ tabs: payload }),
    setActiveTab: () => (payload) => ({ activeTab: payload })
  }),
  withHandlers({
    handleClick: ({ onClick, setActiveTab }) => (tabName) => {
      const name = tabName === 'NEW FILE' ? 'new' : tabName
      onClick && onClick(name)
      setActiveTab(tabName)
    },
    addNewItem: ({ history, collectionsRoute, tabs, setTabs }) => () => {
      if (tabs[0]['name'] !== 'NEW FILE') {
        history.push(`${collectionsRoute}/new`)
      }
    },
    closeTab: ({ tabs, history, collectionsRoute, setTabs }) => (tab) => {
      const newTabs = tabs.filter(t => t['name'] !== tab['name'])
      setTabs(newTabs)
      history.push(`${collectionsRoute}/${newTabs[0]['name']}`)
    }
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab, tabs, setTabs }) => {
    if (match.params['item'] === 'new') {
      if (tabs[0]['name'] !== 'NEW FILE') {
        setTabs([{ name: 'NEW FILE' }, ...tabs])
      }
      setActiveTab('NEW FILE')
    } else {
      setActiveTab(match.params['item'])
    }
  })
)

export default enhance(Tabs)
