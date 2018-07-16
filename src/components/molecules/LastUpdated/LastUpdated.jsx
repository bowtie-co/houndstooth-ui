import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const LastUpdated = ({ time }) => {
  return (
    <p>last updated: {moment(time, 'YYYYMMDD').fromNow()}</p>
  )
}

LastUpdated.propTypes = {
  time: PropTypes.string
}

export default LastUpdated
