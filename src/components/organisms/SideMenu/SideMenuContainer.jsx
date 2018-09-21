/* global btoa */

import { compose, withStateHandlers, lifecycle, withPropsOnChange } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
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
