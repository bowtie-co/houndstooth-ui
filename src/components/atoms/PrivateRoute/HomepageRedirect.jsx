import React from 'react'
import { Redirect } from 'react-router-dom'

const HomepageRedirect = () => {
  return (
    <Redirect to={'/home'} />
  )
}

export default HomepageRedirect
