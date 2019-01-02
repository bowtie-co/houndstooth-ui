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
    setTabs: () => (payload) => ({ items: payload }),
    setActiveTab: () => (payload) => ({ activeTab: payload })
  }),
  withHandlers({
    handleClick: ({ onClick, setActiveTab }) => (tabName) => {
      const name = tabName === 'NEW FILE' ? 'new' : tabName
      onClick && onClick(name)
      setActiveTab(tabName)
    },
    addNewItem: ({ history, match, items, setTabs }) => () => {
      if (items[0]['name'] !== 'NEW FILE') {
        const { username, repo, collection } = match.params
        history.push(`/${username}/${repo}/collections/${collection}/new`)
      }
    },
    closeTab: ({ items, history, setTabs, match }) => (tab) => {
      const newTabs = items.filter(t => t['name'] !== tab['name'])
      setTabs(newTabs)
      const { username, repo, collection } = match.params
      history.push(`/${username}/${repo}/collections/${collection}/${newTabs[0]['name']}`)
    }
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab, items, setTabs }) => {
    if (match.params['item'] === 'new') {
      if (items[0]['name'] !== 'NEW FILE') {
        setTabs([{ name: 'NEW FILE' }, ...items])
      }
      setActiveTab('NEW FILE')
    } else {
      setActiveTab(match.params['item'])
    }
  })
)

export default enhance(ItemList)
