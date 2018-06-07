/* eslint-disable camelcase */

import { withRouter } from 'react-router'
import { compose, withState, withProps } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import RestrictedRedirect from './RestrictedRedirect'
import PrivateComponent from './PrivateComponent'
import LoginRedirect from './LoginRedirect'
import ResumeRouteRedirect from './ResumeRouteRedirect'
import HomepageRedirect from './HomepageRedirect'
import storage from '../../lib/storage'
// import api from '../../lib/api'

/** *** conditional functions here: *****/

// redirect if user is not logged in
const unauthenticatedConditionFn = ({ currentUser }) => !currentUser

// a redirect based on current users role, ex. admin.
const restrictedConditionFn = ({ roles, currentUser }) => roles.length > 0 && !roles.includes(currentUser.role)

// if storage.resumeRoute is set, user will be redirected to where they came from after login.
const resumeRouteConditionFn = ({ currentUser, resumeRoute }) => {
  return currentUser && resumeRoute
}

// if storage.resumeRoute is set, user will be redirected to where they came from after login.
const homepageConditionFn = ({ currentUser, resumeRoute }) => {
  return currentUser && !resumeRoute
}

export const enhance = compose(
  withRouter,
  withProps(({ roles }) => ({ roles: roles || [] })),
  withState('currentUser', 'setCurrentUser', () => storage.get('current_user')),
  withEither(unauthenticatedConditionFn, LoginRedirect),
  withEither(restrictedConditionFn, RestrictedRedirect),
  withProps(({ location }) => {
    let resumeRoute = storage.get('resumeRoute')

    if (resumeRoute === location.pathname) {
      resumeRoute = false
    }

    return {
      resumeRoute
    }
  }),
  withEither(resumeRouteConditionFn, ResumeRouteRedirect),
  withEither(homepageConditionFn, HomepageRedirect)
)

export default enhance(PrivateComponent)
