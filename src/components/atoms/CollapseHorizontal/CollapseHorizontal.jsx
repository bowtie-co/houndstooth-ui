import React from 'react'
import classnames from 'classnames'
import {
  Icon
} from 'atoms'
import { Resizable } from 're-resizable'

const Col = ({ children, isCollapsed, toggleIsCollapsed, ...rest }) => {
  return (
    
    <div className={classnames({ collapsedWrapper: isCollapsed }, 'collapse-horizontal')}>
      
      <div className='collapsable-arrow pointer' onClick={toggleIsCollapsed}>
        <Icon iconName={`${isCollapsed ? 'angle-right' : 'angle-left'}`} size='md' />
      </div>
      <Resizable
        enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
        minWidth={222}
        className={'side-menu-flex'}
      >
        <div className={classnames({ isCollapsed })} {...rest}>

          { children }

        </div>
      </Resizable>
    </div>
    
  )
}

export default Col
