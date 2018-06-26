import React from 'react'
import moment from 'moment'

const TimeFromNow = ({ time }) => {
  return (
    <span>{moment(time, "YYYYMMDD").fromNow()}</span>
  )
}

export default TimeFromNow
