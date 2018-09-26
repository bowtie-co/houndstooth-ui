import React from 'react'
import qs from 'qs'
import classNames from 'classnames'
import { Collapse } from 'reactstrap'
import { titleize } from '@bowtie/utils'
import {
  NavLink,
  Nav,
  Icon,
  Col,
  Row
} from 'atoms'

const SideMenu = (props) => {
  const { baseRoute, queryParams, activeTab, setActiveTab, match, collections } = props
  const { repo, username, collection, type } = match.params
  return (
    <Nav vertical className={'side-menu-section flex-column'} sm='2'>
      <NavLink
        onClick={() => setActiveTab('dashboard')}
        active={activeTab === 'dashboard'}
        path={'/repos'}
      >

        <Row className='flex-center'>
          <Col sm='3'>
            <Icon size='sm' iconName='tachometer-alt' />
          </Col>
          <Col sm='9'>
            Dashboard [REPOS]
          </Col>
        </Row>
      </NavLink>

      <div
        className={classNames('nav-link', { 'disabled': collections.length < 1, 'active': activeTab === 'collections' && collections.length >= 1 })}
        disabled={(!repo && !username) || collections.length < 1}
      >

        <Row className='flex-center' onClick={() => (repo && username) || collections.length > 0 && setActiveTab('collections')}>
          <Col sm='3'>
            <Icon size='sm' iconName='folder' />
          </Col>
          <Col sm='9'>
            Collections
          </Col>
        </Row>
        <Collapse isOpen={activeTab === 'collections'}>
          {
            collections.map((col, i) => {
              return (
                <NavLink
                  active={collection === col}
                  path={`/repos/${username}/${repo}/collections/${col}?${qs.stringify(queryParams, { encode: false })}`}
                >
                  <Row className='flex-center'>
                    <Col sm='3'>
                      <Icon size='sm' iconName='folder' fill={false} />
                    </Col>
                    <Col sm='9'>
                      {titleize(col, '_')}
                    </Col>
                  </Row>

                </NavLink>
              )
            })
          }
        </Collapse>
      </div>

      <NavLink
        active={activeTab === 'users'}
        path={'/repos'}
        onClick={() => setActiveTab('users')}
      >

        <Row className='flex-center' >
          <Col sm='3'>
            <Icon size='sm' iconName='user' />
          </Col>
          <Col sm='9'>
            Users
          </Col>
        </Row>
      </NavLink>

      <div
        className={classNames('nav-link', { 'active': ['file', 'dir', 'advanced_settings'].includes(activeTab) })}
        onClick={() => setActiveTab('advanced_settings')}
      >

        <Row className='flex-center'>
          <Col sm='3'>
            <Icon size='sm' iconName='cogs' />
          </Col>
          <Col sm='9'>
            Advanced Settings
          </Col>
        </Row>
        <Collapse isOpen={['file', 'dir', 'advanced_settings'].includes(activeTab)}>
          <NavLink
            active={['file', 'dir'].includes(type)}
            onClick={() => setActiveTab('file')}
            disabled={!repo && !username}
            path={`/${baseRoute}/dir?ref=${queryParams['ref'] || 'master'}`}>

            <Row className='flex-center'>
              <Col sm='3'>
                <Icon size='sm' iconName='folder-open' />
              </Col>
              <Col sm='9'>
                File Editor
              </Col>
            </Row>
          </NavLink>
        </Collapse>
      </div>
    </Nav>
  )
}

export default SideMenu
