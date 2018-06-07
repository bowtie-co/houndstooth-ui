import React from 'react'
import { Redirect } from 'react-router-dom'
import storage from '../../lib/storage'

const LoginRedirect = (props) => {
  // Once a user is logged in, the redirectPage tells where to send the user.
  // If a resumeRoute was set before user logged in, it will send them there
  // else it will send them to the user dashbaord.
  let redirectPage = storage.get('resumeRoute') ? storage.get('resumeRoute') : '/dashboard'

  if (!storage.get('current_user')) {
    storage.set('resumeRoute', props.location.pathname)
    redirectPage = '/login'
  }  
  if (redirectPage === props.location.pathname) {
    redirectPage = '/dashboard'
  }

  return (
    <Redirect to={redirectPage} />
  )
}

export default LoginRedirect
