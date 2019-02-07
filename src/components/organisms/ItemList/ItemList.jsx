import React from 'react'
import classnames from 'classnames'
import {
  Col,
  Row,
  Icon
} from 'atoms'
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap'

const ItemList = ({ items = [], activeTab, handleClick, children, vertical = false, closeTab, addNewItem, ...rest }) => {
  return (
    <section>
      <div className='pointer addFile' onClick={addNewItem}>
        <Icon iconName='plus-circle' /> Add File
      </div>
      <Nav tabs vertical={vertical}>
        <Row>
          <Col sm='3' md='2' lg='2' xl='1' className='tabs-vertical'>
            {
              items.map((item, i) => {
                return (
                  <NavItem key={i} className={classnames({ active: activeTab === item.name })}>
                    {
                      item.name === 'NEW FILE' &&
                        <Icon iconName='times-circle' onClick={() => closeTab(item)} />
                    }
                    <NavLink
                      onClick={() => handleClick(item.name)}
                      className={classnames({ active: activeTab === item.name })}
                    >
                      {item.name}
                    </NavLink>
                  </NavItem>
                )
              })
            }

          </Col>
          <TabContent activeTab={activeTab} className='col-sm-9 col-md-10 col-lg-10 col-xl-11'>
            { children }
          </TabContent>
        </Row>
      </Nav>
    </section>
  )
}

export default ItemList
