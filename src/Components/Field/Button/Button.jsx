import React from 'react'
import Button from '../../Button/Button'

const ButtonField = ({ label, ...props }) => {
  return (
    <Button {...props}>{label}</Button>
  )
}

export default ButtonField
