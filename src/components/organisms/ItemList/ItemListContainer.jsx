// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import ItemList from './ItemList'
import { withRouter } from 'react-router'
import { compose, withHandlers, withStateHandlers, withPropsOnChange } from 'recompose'
import { animateScroll } from 'react-scroll'

export const enhance = compose(
  withRouter,
  withStateHandlers(({ match, items = [] }) => ({
    itemsTabs: items,
    activeTab: match.params['item']
  }), {
    setItemTabs: () => (payload) => ({ itemsTabs: payload }),
    setActiveTab: () => (payload) => ({ activeTab: payload })
  }),
  withHandlers({
    handleClick: ({ onClick, setActiveTab }) => (tabName) => {
      const name = tabName === 'NEW FILE' ? 'new' : tabName
      onClick && onClick(name)
      animateScroll.scrollToTop()
      setActiveTab(tabName)
    },
    addNewItem: ({ history, baseRoute, match, itemsTabs, setItemTabs }) => () => {
      if (itemsTabs.length === 0 || itemsTabs[0]['name'] !== 'NEW FILE') {
        const { collection } = match.params
        history.push(`/${baseRoute}/collections/${collection}/new`)
      }
    },
    closeTab: ({ baseRoute, itemsTabs, history, setItemTabs, match }) => (tab) => {
      const newTabs = itemsTabs.filter(t => t['name'] !== tab['name'])
      setItemTabs(newTabs)
      const { collection } = match.params
      history.push(`/${baseRoute}/collections/${collection}/${newTabs.length > 0 ? newTabs[0]['name'] : ''}`)
    }
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab, itemsTabs, setItemTabs, permissions }) => {
    if (match.params['item'] === 'new' && permissions['push']) {
      if (itemsTabs.length === 0 || itemsTabs[0]['name'] !== 'NEW FILE') {
        setItemTabs([{ name: 'NEW FILE' }, ...itemsTabs])
      }
      setActiveTab('NEW FILE')
    } else {
      setActiveTab(match.params['item'])
    }
  }),
  withPropsOnChange(
    ({ items, match }, { items: nextItems, match: nextMatch }) => items.length !== nextItems.length || match.params['collection'] !== nextMatch.params['collection'],
    ({ items, setItemTabs }) => {
      setItemTabs([...items])
    })
)

export default enhance(ItemList)
