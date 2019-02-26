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
  const { collection, repo, username } = match.params
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
                      path={`/${baseRoute}/collections/${col}?${qs.stringify(Object.assign(queryParams, { path: `_${col}` }), { encode: false })}`}
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
          path={`/${baseRoute}/users`}
          onClick={() => setActiveTab('users')}
          disabled={!repo && !username}
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
      </Nav>
    </CollapseHorizontal>
  )
}

export default SideMenu
