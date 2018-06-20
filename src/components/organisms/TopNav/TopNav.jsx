import React from 'react'
import { Header } from '../../molecules'
import { NavLink } from '../../atoms'

const TopNav = (props) => {
  return (
    <section className='top-nav-section' >
      <Header title={'Welcome to Bowtie\'s React-Recompose Starter Kit'} />
      <div className='nav-bar'>
        <NavLink path={'/home'} title={'Home'} />
        <NavLink path={'/demo'} title={'Demo'} />
      </div>
    </section>
  )
}

export default TopNav
