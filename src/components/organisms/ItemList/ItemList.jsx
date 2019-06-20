import React from 'react'
import classnames from 'classnames'
import {
  Col,
  Row,
  Icon
} from 'atoms'
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap'
import { Resizable } from 're-resizable'

const ItemList = ({ itemsTabs = [], activeTab, handleClick, children, vertical = false, closeTab, addNewItem, permissions, defaultFields, ...rest }) => {
  const hasFields = defaultFields && defaultFields['fields'] && Object.keys(defaultFields['fields']).length > 0

  return (
    <section>
      {
        permissions['push'] && hasFields &&
          <div className='pointer addFile' onClick={addNewItem}>
            <Icon iconName='plus-circle' /> Add File
          </div>
      }
      <Nav tabs vertical={vertical}>
        <Row>
          <Resizable
            enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
            minWidth={150}
            maxWidth={275}
          >
            <Col className='tabs-vertical'>
              {
                itemsTabs.map((item, i) => {
                  return (
                    <NavItem key={i} className={classnames({ active: activeTab === item.name }, 'pointer')}>
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
          </Resizable>
          <TabContent activeTab={activeTab}>
            { children }
          </TabContent>
        </Row>
      </Nav>
    </section>
  )
}

export default ItemList
