import Api from '@bowtie/api'
import airbrake from './airbrake'
import storage from './storage'
import notifier from './notifier'
import parseLinkHeader from 'parse-link-header'

const api = new Api({
  root: process.env.REACT_APP_API_ROOT_URL,
  stage: process.env.REACT_APP_API_STAGE,
  prefix: process.env.REACT_APP_API_PREFIX,
  version: process.env.REACT_APP_API_VERSION,
  secureOnly: process.env.NODE_ENV !== 'development',
  verbose: process.NODE_ENV !== 'production',
  authorization: 'Bearer'
})

api.authorize({
  // token: () => storage.get('id_token')
  token: () => storage.get('access_token')
})

const handleApiUnauthorized = (resp) => {
  notifier.pubnub && notifier.pubnub.stop()
  storage.clear()
  window.location.reload()
}

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

api.use(async (response) => {
  try {
    response.data = await response.json()
  } catch (e) {
    return Promise.resolve(response)
  }

  response.pages = {}

  if (response.headers.get('link')) {
    response.pages = Object.assign(response.pages, parseLinkHeader(response.headers.get('link')))
  }

  if (response.headers.get('total')) {
    response.pages.total = parseInt(response.headers.get('total'), 10)
  }

  if (response.headers.get('page')) {
    response.pages['page'] = parseInt(response.headers.get('page'), 10)
    response.pages['page-count'] = parseInt((response.pages['last'] ? response.pages['last'].page : response.pages['page']), 10)
  }

  if (response.headers.get('per-page')) {
    response.pages['per-page'] = parseInt(response.headers.get('per-page'), 10)
  }

  return Promise.resolve(response)
})

export default api
