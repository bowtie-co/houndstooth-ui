import React from 'react'
import {
  BowtieLogo,
  ReactLogo,
  Title
} from '../../atoms'

const Brand = ({ title }) => {
  return (
    <header className='header'>
      <div className='logo-container'>
        <BowtieLogo />
      </div>
      <Title title={title} />
    </header>
  )
}

export default Brand
