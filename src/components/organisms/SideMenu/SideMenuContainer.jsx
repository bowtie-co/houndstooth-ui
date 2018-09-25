import { compose, withStateHandlers } from 'recompose'
import SideMenu from './SideMenu'

export default compose(
  withStateHandlers(({ match }) => ({
    activeTab: match.params['type'] || 'dashboard',
    activeCollection: match.params['collection']
  }), {
    setActiveTab: ({ activeTab }) => (payload) => ({ activeTab: payload }),
    setActiveCollection: ({ activeCollection }) => (payload) => ({ activeCollection: payload })
  })
)(SideMenu)
