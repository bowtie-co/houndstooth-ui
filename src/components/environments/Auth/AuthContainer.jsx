import { lifecycle } from 'recompose'
import auth from '../../../lib/auth'

export default lifecycle({
  componentWillMount () {
    const { location, history } = this.props
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication((err) => {
        if (err) {
          history.push('/login')
        } else {
          history.push('/home')
        }
      })
    }
  }
})(() => null)
