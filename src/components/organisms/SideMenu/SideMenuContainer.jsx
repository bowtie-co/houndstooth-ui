import { compose, withStateHandlers, withPropsOnChange } from 'recompose'
import SideMenu from './SideMenu'

export default compose(
  withStateHandlers(({ match }) => ({
    activeTab: match.params['type']
  }), {
    setActiveTab: ({ activeTab }) => (payload) => ({ activeTab: payload })
  }),
  withPropsOnChange(['match'], ({ match, setActiveTab }) => {
    setActiveTab(match.params['type'])
  })
)(SideMenu)
