// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import ItemList from './ItemList'
import { withRouter } from 'react-router'
import { compose, withHandlers, withStateHandlers, withPropsOnChange } from 'recompose'

export const enhance = compose(
  withRouter,
  withStateHandlers(({ match, items }) => ({
    items: items,
    activeTab: match.params['item']
  }), {
    setItemTabs: () => (payload) => ({ items: payload }),
    setActiveTab: () => (payload) => ({ activeTab: payload })
  }),
  withHandlers({
    handleClick: ({ onClick, setActiveTab }) => (tabName) => {
      const name = tabName === 'NEW FILE' ? 'new' : tabName
      onClick && onClick(name)
      setActiveTab(tabName)
    },
    addNewItem: ({ history, baseRoute, match, items, setItemTabs }) => () => {
      if (items.length === 0 || items[0]['name'] !== 'NEW FILE') {
        const { collection } = match.params
        history.push(`/${baseRoute}/collections/${collection}/new`)
      }
    },
    closeTab: ({ baseRoute, items, history, setItemTabs, match }) => (tab) => {
      const newTabs = items.filter(t => t['name'] !== tab['name'])
      setItemTabs(newTabs)
      const { collection } = match.params
      history.push(`/${baseRoute}/collections/${collection}/${newTabs.length > 0 ? newTabs[0]['name'] : ''}`)
    }
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab, items, setItemTabs }) => {
    if (match.params['item'] === 'new') {
      if (items.length === 0 || items[0]['name'] !== 'NEW FILE') {
        setItemTabs([{ name: 'NEW FILE' }, ...items])
      }
      setActiveTab('NEW FILE')
    } else {
      setActiveTab(match.params['item'])
    }
  })
)

export default enhance(ItemList)
