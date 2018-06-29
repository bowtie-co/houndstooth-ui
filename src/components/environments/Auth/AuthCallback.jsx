import { lifecycle } from 'recompose'
import auth from '../../../lib/auth'
import storage from '../../../lib/storage'

export default lifecycle({
  componentWillMount () {
    const { location, history } = this.props

    if (/access_token|id_token|error/.test(location.hash)) {
      const resumeRoute = storage.get('resumeRoute') || '/'

      auth.handleAuthentication((err) => {
        if (err) {
          console.error(err)
          history.push('/')
        } else {
          history.push(resumeRoute)
        }
      })
    } else {
      console.error('Bad callback location hash', location)
      history.push('/')
    }
  }
})(() => null)
