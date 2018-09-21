import React from 'react'
import { NavLink, Nav, Icon, Col, Row } from 'atoms'

const SideMenu = (props) => {
  const { baseRoute, queryParams, activeTab, setActiveTab, match } = props
  const { repo, username } = match.params
  return (
    <Nav vertical className={'side-menu-section flex-column'} sm='2'>
      <NavLink
        active={activeTab === 'dashboard'}
        onClick={() => setActiveTab('dashboard')}
        path={'/repos'}>

        <Row className='flex-center'>
          <Col sm='3'>
            <Icon size='sm' iconName='tachometer-alt' />
          </Col>
          <Col sm='9'>
            Dashboard [REPOS]
          </Col>
        </Row>
      </NavLink>

      <NavLink
        active={activeTab === 'collections'}
        onClick={() => setActiveTab('collections')}
        disabled={!repo && !username}
        path={`/${baseRoute}/collections?ref=${queryParams['ref'] || 'master'}`}>

        <Row className='flex-center'>
          <Col sm='3'>
            <Icon size='sm' iconName='folder' />
          </Col>
          <Col sm='9'>
            Collections
          </Col>
        </Row>
      </NavLink>

      <NavLink
        active={activeTab === 'users'}
        onClick={() => setActiveTab('users')}
        path={'/'}>

        <Row className='flex-center'>
          <Col sm='3'>
            <Icon size='sm' iconName='user' />
          </Col>
          <Col sm='9'>
            Users
          </Col>
        </Row>
      </NavLink>

      <NavLink
        active={activeTab === 'advanced_settings'}
        onClick={() => setActiveTab('advanced_settings')}
        path={'/'}>

        <Row className='flex-center'>
          <Col sm='3'>
            <Icon size='sm' iconName='cogs' />
          </Col>
          <Col sm='9'>
            Advanced Settings
          </Col>
        </Row>
      </NavLink>

      <NavLink
        active={['file', 'dir'].includes(activeTab)}
        onClick={() => setActiveTab('file')}
        disabled={!repo && !username}
        path={`/${baseRoute}/dir?ref=${queryParams['ref'] || 'master'}`}>

        <Row className='flex-center'>
          <Col sm='3'>
            <Icon size='sm' iconName='folder' />
          </Col>
          <Col sm='9'>
            File Editor
          </Col>
        </Row>
      </NavLink>
    </Nav>
  )
}

export default SideMenu
