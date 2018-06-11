import AirbrakeClient from 'airbrake-js'

const airbrake = new AirbrakeClient({
  projectId: process.env.REACT_APP_AIRBRAKE_ID,
  projectKey: process.env.REACT_APP_AIRBRAKE_KEY
})

airbrake.addFilter((notice) => {
  notice.context.environment = process.env.REACT_APP_ENV || 'development'
  notice.context.version = process.env.REACT_APP_VERSION || '0'

  if (notice.context.environment === 'development') {
    notice.context.severity = 'warn'
  }

  return notice
})

export default airbrake
