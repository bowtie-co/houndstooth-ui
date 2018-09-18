import React from 'react'
import { NavLink, Nav, Icon } from 'atoms'

const SideMenu = ({ user }) => {
  return (
    <Nav vertical className={'flex-column'}>
      <NavLink path={'/home'}>
        <Icon size='sm' iconName='tachometer-alt' />Dashboard
      </NavLink>
      <NavLink path={'/'} >
        <Icon size='sm' iconName='folder' />Collections
      </NavLink>
      <NavLink path={'/'} >
        <Icon size='sm' iconName='user' />Users
      </NavLink>
      <NavLink path={'/'} >
        <Icon size='sm' iconName='cogs' />Advanced Settings
      </NavLink>
    </Nav>
  )
}

export default SideMenu
