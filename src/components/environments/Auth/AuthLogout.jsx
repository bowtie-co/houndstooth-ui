import { lifecycle } from 'recompose'
import auth from '../../../lib/auth'

export default lifecycle({
  componentWillMount () {
    const { history } = this.props

    auth.logout()

    history.push('/')
  }
})(() => null)
