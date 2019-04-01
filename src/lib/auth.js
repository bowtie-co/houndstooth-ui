import storage from './storage'
import qs from 'qs'
import uuid from 'uuid/v1'

class Auth {
  login () {
    const authState = uuid()
    storage.set('authState', authState)

    console.log('redirecting for login with state', authState)
    window.location = process.env.REACT_APP_AUTHORIZE_URL + '?' + qs.stringify({
      state: authState,
      scope: 'user:email,read:user,repo'
    })
  }

  handleRedirect () {
    const authState = storage.get('authState')
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    console.log('handling auth redirect!', authState, window.location, params)

    if (params.state !== authState) {
      throw new Error('BAD AUTH STATE')
    }

    window.location = process.env.REACT_APP_CALLBACK_URL + '?' + qs.stringify({
      state: authState,
      code: params.code
    })
  }

  handleCallback (callback) {
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    console.log('handling auth callback!', window.location, params)

    if (params.access_token) {
      this.setSession(params)
      callback()
    } else {
      callback(new Error('MISSING AUTH TOKEN'))
    }
  }

  setSession (authResult) {
    storage.set('access_token', authResult.access_token)
  }

  logout () {
    storage.clear()
  }

  isAuthenticated () {
    return !!storage.get('access_token')
  }
}
const auth = new Auth()

export default auth
