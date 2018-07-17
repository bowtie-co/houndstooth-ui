import { lifecycle } from 'recompose'
import { auth } from 'lib'

export default lifecycle({
  componentWillMount () {
    auth.login()
  }
})(() => null)
