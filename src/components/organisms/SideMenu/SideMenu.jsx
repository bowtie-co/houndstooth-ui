import React from 'react'
import qs from 'qs'
import classnames from 'classnames'
import { Collapse } from 'reactstrap'
import { titleize } from '@bowtie/utils'
import {
  NavLink,
  Nav,
  Icon,
  Col,
  Row,
  CollapseHorizontal
} from 'atoms'

const SideMenu = (props) => {
  const { baseRoute, queryParams, activeTab, setActiveTab, match, collections } = props
  const { collection } = match.params
  return (
    <CollapseHorizontal>
      <Nav vertical className='side-menu-section'>
        <NavLink
          onClick={() => setActiveTab('dashboard')}
          active={activeTab === 'dashboard'}
          path={'/'}
        >

          <Row className='flex-center'>
            <Col sm='3'>
              <Icon size='sm' className='fa fa-th-list' />
            </Col>
            <Col sm='9'>
              <div className='nav-link-title'>Repos</div>

            </Col>
          </Row>
        </NavLink>

        <div
          className={classnames('nav-link', { 'disabled': !collections || collections.length < 1, 'active': activeTab === 'collections' && collections && collections.length >= 1 })}
        >

          <Row className='flex-center' onClick={() => collections && collections.length > 0 && setActiveTab('collections')}>
            <Col sm='3'>
              <Icon size='sm' iconName='folder' />
            </Col>
            <Col sm='9'>
              <div className='nav-link-title'>
              Collections
              </div>
            </Col>
          </Row>
          <Collapse isOpen={['collections'].includes(activeTab)}>
            <div className='collapsable-content'>
              {
                collections && collections.map((col, i) => {
                  return (
                    <NavLink
                      key={i}
                      active={collection === col}
                      className='nested'
                      path={`/${baseRoute}/collections/${col}?${qs.stringify(queryParams, { encode: false })}`}
                    >
                      <Row className='flex-center'>
                        <Col sm='3'>
                          <Icon size='sm' iconName='folder' fill={false} />
                        </Col>
                        <Col sm='9'>
                          <div className='nav-link-title'>
                            {titleize(col, '_')}
                          </div>
                        </Col>
                      </Row>

                    </NavLink>
                  )
                })
              }
            </div>
          </Collapse>
        </div>

        <NavLink
          active={activeTab === 'users'}
          path={`/${baseRoute}/_users`}
          onClick={() => setActiveTab('users')}
        >

          <Row className='flex-center' >
            <Col sm='3'>
              <Icon size='sm' iconName='user' />
            </Col>
            <Col sm='9'>
              <div className='nav-link-title'>
                Users
              </div>
            </Col>
          </Row>
        </NavLink>

        {/* <div
          className={classnames('nav-link', { 'active': ['file', 'dir', 'advanced_settings'].includes(activeTab) })}
          onClick={() => setActiveTab('advanced_settings')}
        >

          <Row className='flex-center'>
            <Col sm='3'>
              <Icon size='sm' iconName='cogs' />
            </Col>
            <Col sm='9'>
              <div className='nav-link-title'>
              Advanced Settings
              </div>
            </Col>
          </Row>
          <Collapse isOpen={['file', 'dir', 'advanced_settings'].includes(activeTab)}>
            <NavLink
              active={['file', 'dir'].includes(type)}
              onClick={() => setActiveTab('file')}
              disabled={!repo && !username}
              path={`/${baseApiRoute}/dir?ref=${queryParams['ref'] || 'master'}`}>

              <Row className='flex-center'>
                <Col sm='3'>
                  <Icon size='sm' iconName='folder' fill={false} />
                </Col>
                <Col sm='9'>
                  <div className='nav-link-title'>
                  File Editor
                  </div>
                </Col>
              </Row>
            </NavLink>
          </Collapse>
        </div> */}
      </Nav>
    </CollapseHorizontal>
  )
}

export default SideMenu
