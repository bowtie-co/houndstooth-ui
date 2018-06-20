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
        <h1> + </h1>
        <ReactLogo />
      </div>
      <Title title={title} />
    </header>
  )
}

export default Brand
