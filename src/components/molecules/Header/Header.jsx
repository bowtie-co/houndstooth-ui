import React from 'react'
import {
  Logo,
  Title
} from '../../atoms'

const Header = ({ title }) => {
  return (
    <header className='header'>
      <Logo />
      <Title title={title} />
    </header>
  )
}

export default Header