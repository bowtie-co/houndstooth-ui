import React from 'react'
import PropTypes from 'prop-types'
import {
  BowtieLogo,
  Title
} from 'atoms'

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

Brand.propTypes = {
  title: PropTypes.string.isRequired
}

export default Brand
