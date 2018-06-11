import Api from '@bowtie/api'
import airbrake from './airbrake'
import storage from './storage'

const api = new Api({
  root: process.env.REACT_APP_API_ROOT_URL,
  version: process.env.REACT_APP_API_VERSION,
  secureOnly: process.env.NODE_ENV !== 'development',
  verbose: process.NODE_ENV !== 'production',
  authorization: 'Bearer'
})

api.authorize({
  token: () => storage.get('access_token')
})

// Handler for all non 2xx code api responses
const handleApiError = (resp) => {
  console.warn('API Error', resp)

  // Airbrake severity is warning unless response status was 5xx
  const severity = /^5\d\d$/.test(resp.status) ? 'error' : 'warn'
  let errorTitle = `${resp.status} ${resp.statusText}`

  if (resp.data && resp.data.message && resp.data.message.trim() !== '') {
    errorTitle = resp.data.message
  }

  airbrake.notify({
    error: new Error(`API ${severity}: ${errorTitle}`),
    context: {
      severity,
      resp
    }
  })
}

// Attach handlers to event emitter by string event name
api.on('error', handleApiError)
api.on('401', handleApiUnauthorized)

export default api
