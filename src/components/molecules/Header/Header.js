import React from 'react'
import Logo from '../../atoms/Logo/Logo'

const Header = ({ title }) => {
  return (
    <header className='header'>
      <Logo />
      <h1 className='title'>{ title }</h1>
    </header>
  )
}

export default Header