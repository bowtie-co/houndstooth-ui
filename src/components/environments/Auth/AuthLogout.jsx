import React from 'react'
import { Redirect } from 'react-router-dom'
import { lifecycle } from 'recompose'
import auth from '../../../lib/auth'

export default lifecycle({
  componentWillMount () {
    auth.logout()
  }
})(() => <Redirect to='/welcome' />)
