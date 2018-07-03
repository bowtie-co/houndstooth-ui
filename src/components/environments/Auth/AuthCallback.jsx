import { lifecycle } from 'recompose'
import api from '../../../lib/api'
import auth from '../../../lib/auth'
import storage from '../../../lib/storage'

export default lifecycle({
  componentWillMount () {
    const { history } = this.props

    const resumeRoute = storage.get('resumeRoute') || '/'

    auth.handleCallback((err) => {
      if (err) {
        console.error(err)
        history.push('/')
      } else {
        api.get('user')
        history.push(resumeRoute)
      }
    })
  }
})(() => null)
