import React from 'react'
import classnames from 'classnames'
import {
  Col,
  Row,
  Icon
} from 'atoms'
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap'

const Tabs = ({ tabs = [], activeTab, handleClick, children, vertical = false, closeTab, addNewItem, ...rest }) => {
  return (
    <section>
      <div className='pointer addFile' onClick={addNewItem}>
        <Icon iconName='plus-circle' /> Add File
      </div>
      <Nav tabs vertical={vertical}>
        <Row>
          <Col sm='2' className='tabs-vertical'>
            {
              tabs.map((t, i) => {
                return (
                  <NavItem key={i} className={classnames({ active: activeTab === t.name })}>
                    {
                      t.name === 'NEW FILE' &&
                        <Icon iconName='times-circle' onClick={() => closeTab(t)} />
                    }
                    <NavLink
                      onClick={() => handleClick(t.name)}
                      className={classnames({ active: activeTab === t.name })}
                    >
                      {t.name}
                    </NavLink>
                  </NavItem>
                )
              })
            }

          </Col >
          <TabContent activeTab={activeTab} className='col-sm-10'>
            { children }
          </TabContent>
        </Row>
      </Nav>
    </section>
  )
}

export default Tabs
