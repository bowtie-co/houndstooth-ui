import { lifecycle } from 'recompose'
import auth from '../../../lib/auth'

export default lifecycle({
  componentWillMount () {
    auth.login()
  }
})(() => null)
