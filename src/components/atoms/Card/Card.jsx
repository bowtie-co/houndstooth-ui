import React from 'react'
import {
  Card as CardRR
} from 'reactstrap'

const Card = ({ children, className }) => {
  return (
    <CardRR>
      { children }
    </CardRR>
  )
}

export default Card
