import { lifecycle } from 'recompose'
import { api, storage, auth } from 'lib'

export default lifecycle({
  componentWillMount () {
    const { history } = this.props

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
  }
})(() => null)
