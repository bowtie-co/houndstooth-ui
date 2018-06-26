import React from 'react'
import auth from '../../../lib/auth'


const Login = () => {
  return (
    <div className='nav-link' onClick={auth.login}>
      Login
    </div>
  )
}

export default Login
