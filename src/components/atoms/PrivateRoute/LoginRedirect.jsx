import React from 'react'
import { Redirect } from 'react-router-dom'
import { storage } from 'lib'

const LoginRedirect = (props) => {
  // If a user is not logged in, they will be sent to either /login with a resume route to send them where they came from
  // or send them to the dashboard...

  console.log('!!! - LOGIN REDIRECT - !!!', props)

  storage.set('resumeRoute', props.location.pathname)

  return (
    <Redirect to={'/login'} />
  )
}

export default LoginRedirect
