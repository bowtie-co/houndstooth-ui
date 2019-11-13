import { compose, withStateHandlers, withPropsOnChange } from 'recompose'
import SideMenu from './SideMenu'

export default compose(
  withStateHandlers(({ match, queryParams }) => ({
    activeTab: match.params['type'],
    activeCollection: match.params['collection'],
    activeData: queryParams['path']
  }), {
    setActiveTab: ({ activeTab }) => (payload) => ({ activeTab: payload }),
    setActiveCollection: ({ activeCollection }) => (payload) => ({ activeCollection: payload }),
    setActiveData: ({ activeData }) => (payload) => ({ activeData: payload })
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab }) => {
    setActiveTab(match.params['type'] || 'dashboard')
  })
)(SideMenu)
