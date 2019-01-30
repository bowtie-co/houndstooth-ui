/* eslint-disable camelcase */

import { withRouter } from 'react-router'
import { compose, withState, withProps, lifecycle } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import PrivateComponent from './PrivateComponent'
import LoginRedirect from './LoginRedirect'
import { auth, storage } from 'lib'

/** *** conditional functions here: *****/

const unauthenticatedConditionFn = () => !auth.isAuthenticated()

export const enhance = compose(
  withRouter,
  withProps(({ component, action, roles }) => {
    if (component && action) {
      console.error('Please either pass an action or a component into PrivateRoute, not both.')
    }

    const actionAsComponent = () => {
      action()
      return null
    }

    const newComponent = action ? actionAsComponent : component
    return {
      component: newComponent,
      roles: roles || []
    }
  }),
  withState('currentUser', 'setCurrentUser', () => storage.get('current_user')),
  withEither(unauthenticatedConditionFn, LoginRedirect),
  lifecycle({
    componentDidMount () {
      const { location } = this.props
      const resumeRoute = storage.get('resumeRoute')

      if (resumeRoute && resumeRoute === location.pathname) {
        // console.log('route has been resumed!', resumeRoute)
        storage.remove('resumeRoute')
      }
    }
  })
)

export default enhance(PrivateComponent)
