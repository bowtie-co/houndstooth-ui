// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import Auth from './Auth'
import { compose, withHandlers } from 'recompose'
import { auth, storage, api } from 'lib'

export const enhance = compose(
  withHandlers({
    authCallback: ({ history }) => (formData) => {
      const resumeRoute = storage.get('resumeRoute') || '/repos'

      auth.handleCallback((err) => {
        if (err) {
          console.error(err)
          history.push('/')
        } else {
          api.get('user')
          history.push(resumeRoute)
        }
      })
    },
    authLogin: () => () => {
      auth.login()
    },
    authLogout: ({ history }) => () => {
      auth.logout()
      history.push('/welcome')
    },
    authRedirect: ({ history }) => () => {
      try {
        auth.handleRedirect()
      } catch (e) {
        console.error(e)
        history.push('/')
      }
    }
  })
)

export default enhance(Auth)
