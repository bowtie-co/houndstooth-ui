/* eslint-disable camelcase */

import { withRouter } from 'react-router'
import { compose, withState, withProps } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import PrivateComponent from './PrivateComponent'
import LoginRedirect from './LoginRedirect'
// import HomepageRedirect from './HomepageRedirect'
// import RestrictedRedirect from './RestrictedRedirect'
import storage from '../../lib/storage'
import auth from '../../lib/auth'

/** *** conditional functions here: *****/

const unauthenticatedConditionFn = () => !auth.isAuthenticated()

export const enhance = compose(
  withRouter,
  withProps(({ roles }) => ({ roles: roles || [] })),
  withState('currentUser', 'setCurrentUser', () => storage.get('current_user')),
  withEither(unauthenticatedConditionFn, LoginRedirect),
  // withEither(restrictedConditionFn, RestrictedRedirect),
  withProps(({ location }) => {
    let resumeRoute = storage.get('resumeRoute')

    if (resumeRoute === location.pathname) {
      resumeRoute = false
    }

    return {
      resumeRoute
    }
  })
  // withEither(homepageConditionFn, HomepageRedirect)
)

export default enhance(PrivateComponent)
