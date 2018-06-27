import React from 'react'
import moment from 'moment'

const LastUpdated = ({ time }) => {
  return (
    <p>last updated: {moment(time, 'YYYYMMDD').fromNow()}</p>
  )
}

export default LastUpdated
