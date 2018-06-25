import React from 'react'

const Login = ({ auth }) => {
  return (
    <div className='nav-link' onClick={auth.login}>
      Login
    </div>
  )
}

export default Login
