import React from 'react'

const THead = ({ children, ...rest }) => {
  return (
    <thead {...rest}>
      <tr>
        { children }
      </tr>
    </thead>
  )
}

export default THead
