import React from 'react'
import { Switch as SwitchRR } from 'react-router-dom'

const Switch = ({ children }) => {
  return (
    <SwitchRR>
      { children }
    </SwitchRR>
  )
}

export default Switch
