import React from 'react'
import classnames from 'classnames'
import { Col, Row } from 'atoms'
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap'

const Tabs = ({ tabs = [], activeTab, handleClick, children, vertical = false, deleteItem, ...rest }) => {
  return (
    <Nav tabs vertical={vertical}>
      <Row>
        <Col sm='2' className='tabs-vertical'>
          {
            tabs.map((t, i) => (
              <NavItem key={i} className={classnames({ active: activeTab === t.name })}>
                <NavLink
                  onClick={() => handleClick(t.name)}
                  className={classnames({ active: activeTab === t.name })}
                >
                  {t.name}
                </NavLink>
              </NavItem>
            ))
          }

        </Col >
        {/* <Col sm='10'> */}
        <TabContent activeTab={activeTab} className='col-sm-10'>
          { children }
        </TabContent>
        {/* </Col> */}
      </Row>
    </Nav>
  )
}

export default Tabs
