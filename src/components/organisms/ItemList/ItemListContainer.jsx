// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import ItemList from './ItemList'
import { withRouter } from 'react-router'
import { compose, withHandlers, withStateHandlers, withPropsOnChange, withProps } from 'recompose'
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
    addNewItem: ({ history, baseRoute, match, itemsTabs, branch, setItemTabs }) => () => {
      if (itemsTabs.length === 0 || itemsTabs[0]['name'] !== 'NEW FILE') {
        const { collection } = match.params
        history.push(`/${baseRoute}/collections/${collection}/new?ref=${branch}`)
      }
    },
    closeTab: ({ baseRoute, itemsTabs, history, setItemTabs, match, branch }) => (tab) => {
      const newTabs = itemsTabs.filter(t => t['name'] !== tab['name'])
      setItemTabs(newTabs)
      const { collection } = match.params
      history.push(`/${baseRoute}/collections/${collection}/${newTabs.length > 0 ? newTabs[0]['name'] : ''}?ref=${branch}`)
    },
    loadActiveItem: ({ match, permissions, setActiveTab, itemsTabs, setItemTabs }) => () => {
      if (match.params['item'] === 'new' && permissions['push']) {
        if (itemsTabs.length === 0 || itemsTabs[0]['name'] !== 'NEW FILE') {
          setItemTabs([{ name: 'NEW FILE' }, ...itemsTabs])
        }
        setActiveTab('NEW FILE')
      } else {
        setActiveTab(match.params['item'])
      }
    }
  }),
  withProps(({ loadActiveItem }) => {
    loadActiveItem()
  }),
  withPropsOnChange(['match'], ({ loadActiveItem }) => {
    loadActiveItem()
  }),
  withPropsOnChange(
    ({ items, match }, { items: nextItems, match: nextMatch }) => items.length !== nextItems.length || match.params['collection'] !== nextMatch.params['collection'],
    ({ items, setItemTabs }) => {
      setItemTabs([...items])
    })
)

export default enhance(ItemList)
