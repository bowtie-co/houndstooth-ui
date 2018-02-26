/* global localStorage, sessionStorage */

import Api from '@bowtie/api'
import parseLinkHeader from 'parse-link-header'

// In order for API to work, you need to create a .env.development / test / staging / production file that defines these variables.

const api = new Api({
    root: process.env.REACT_APP_API_ROOT_URL,
    version: process.env.REACT_APP_API_VERSION,
    secureOnly: process.env.NODE_ENV !== 'development',
    verbose: process.NODE_ENV !== 'production',
    authorization: 'Bearer'
})

api.authorize({
    token: () => {
        if (localStorage.getItem('remember_me') === 'true') {
            return localStorage.getItem('access_token')
        } else {
            return sessionStorage.getItem('access_token')
        }
    }
})

api.on('error', (resp) => {
    console.error('API Error', resp)
})

// api.use((response) => {
//     response.pages = {}

//     if (response.headers.get('link')) {
//         response.pages = Object.assign(response.pages, parseLinkHeader(response.headers.get('link')))
//     }

//     if (response.headers.get('total')) {
//         response.pages.total = parseInt(response.headers.get('total'), 10)
//     }

//     if (response.headers.get('page')) {
//         response.pages['page'] = parseInt(response.headers.get('page'), 10)
//     }

//     if (response.headers.get('per-page')) {
//         response.pages['per-page'] = parseInt(response.headers.get('per-page'), 10)
//     }

//     return Promise.resolve(response)
// })

// api.on('success', (data, resp) => {
//   if (data.message) {
//     notifier.success(data.message)
//   }
// })

// api.on('401', (resp) => {
//   console.log('received 401', resp)

//   notifier.error('unauthorized')
// })

// api.on('403', (resp) => {
//   console.log('received 403', resp)

//   notifier.warning('forbidden')
// })

// api.on('500', (resp) => {
//   console.log('received 500', resp)

//   notifier.error('Something Failed!')
// })

export default api
