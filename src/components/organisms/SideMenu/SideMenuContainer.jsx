import { compose, withStateHandlers, withPropsOnChange } from 'recompose'
import SideMenu from './SideMenu'

export default compose(
  withStateHandlers(({ match }) => ({
    activeTab: match.params['type'] || '',
    activeCollection: match.params['collection']
  }), {
    setActiveTab: ({ activeTab }) => (payload) => ({ activeTab: payload }),
    setActiveCollection: ({ activeCollection }) => (payload) => ({ activeCollection: payload })
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab }) => {
    setActiveTab(match.params['type'])
  })
)(SideMenu)
