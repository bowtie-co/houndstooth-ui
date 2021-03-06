import React from 'react'
import classnames from 'classnames'
import {
  Icon
} from 'atoms'

const Col = ({ children, isCollapsed, toggleIsCollapsed, ...rest }) => {
  return (
    <div className={classnames({ collapsedWrapper: isCollapsed }, 'collapse-horizontal')}>
      <div className='collapsable-arrow pointer' onClick={toggleIsCollapsed}>
        <Icon iconName={`${isCollapsed ? 'angle-right' : 'angle-left'}`} size='md' />
      </div>
      <div className={classnames({ isCollapsed })} {...rest}>

        { children }

      </div>
    </div>
  )
}

export default Col
