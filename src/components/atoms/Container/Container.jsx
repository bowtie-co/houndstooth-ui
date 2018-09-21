import React from 'react'
import { Container as ContainerRS } from 'reactstrap'

const Container = ({ children, ...rest }) => {
  return (
    <ContainerRS {...rest}>
      { children }
    </ContainerRS>
  )
}

export default Container
