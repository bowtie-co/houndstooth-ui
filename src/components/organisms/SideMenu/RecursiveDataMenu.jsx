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

const RecursiveDataMenu = (props) => {
  const { baseRoute, queryParams, menuData } = props

  return (
    <div>
      {
        menuData && menuData.map((item, i) => {
          return (
            <NavLink
              key={i}
              active={queryParams['path'] === item.path}
              className='nested'
              path={`/${baseRoute}/data?${qs.stringify(Object.assign({}, queryParams, { path: item.path }))}`}
            >
              <Row className='flex-center'>
                <Col sm='3'>
                  <Icon size='sm' iconName={item.type === 'dir' ? 'folder' : 'database'} fill={item.type !== 'dir'} />
                </Col>
                <Col sm='9'>
                  <div className='nav-link-title'>
                    {titleize(item.name, '_')}
                  </div>
                </Col>
              </Row>

              {
                (item.type === 'dir' && item.files) && (
                  <Row className='flex-center'>
                    <Col sm='3'>
                    </Col>
                    <Col sm='9'>
                      <RecursiveDataMenu {...props} menuData={item.files} />
                    </Col>
                  </Row>
                )
              }

            </NavLink>
          )
        })
      }
    </div>
  )
}

export default RecursiveDataMenu
