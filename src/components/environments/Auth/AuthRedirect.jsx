import { lifecycle } from 'recompose'
import auth from '../../../lib/auth'

export default lifecycle({
  componentWillMount () {
    const { history } = this.props

    try {
      auth.handleRedirect()
    } catch (e) {
      console.error(e)
      history.push('/')
    }
  }
})(() => null)
