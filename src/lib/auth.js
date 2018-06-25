import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import storage from './storage'

class Auth {
  constructor () {
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid'
    })
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login () {
    this.auth0.authorize()
  }

  async handleAuthentication () {
    const resp = await this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        console.log('handleAuth')
        return true
      } else if (err) {
        console.log(err)
        return false
      }
    })
    console.log('resp', resp)
    return resp
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    storage.set('access_token', authResult.accessToken)
    storage.set('id_token', authResult.idToken)
    storage.set('expires_at', expiresAt)
  }

  logout () {
    // Clear access token and ID token from local storage
    storage.remove('access_token')
    storage.remove('id_token')
    storage.remove('expires_at')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(storage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
const auth = new Auth()

export default auth
