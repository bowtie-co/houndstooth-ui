import React from 'react'

const MultiColumn = ({ columns, ...rest }) => {
  return (
    <div className='twoColumn'>
      {columns.map((Col) => {
        return (
          <div className='column'>
            <Col {...rest} />
          </div>
        )
      })}
      {/* <div className='column'>
        <ColumnLeft />
      </div> */}
    </div>
  )
}

export default MultiColumn
