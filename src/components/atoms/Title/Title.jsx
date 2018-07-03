import React from 'react'

const Title = ({ title, children }) => {
  return (
    <h1>{ title || children }</h1>
  )
}

export default Title
