import React from 'react'
import { Redirect } from 'react-router-dom'

const HomepageRedirect = () => {
  console.log('Home redirect')
  return (
    <Redirect to={'/welcome'} />
  )
}

export default HomepageRedirect
