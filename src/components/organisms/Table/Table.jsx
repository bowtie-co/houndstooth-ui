import React from 'react'
import { Table as TableRS } from 'reactstrap'

const Table = ({ childrenWithExtraProp, className, ...rest }) => {
  return (
    <TableRS className={`${className || ''} table-padding`} {...rest}>
      { childrenWithExtraProp }
    </TableRS>
  )
}

export default Table
