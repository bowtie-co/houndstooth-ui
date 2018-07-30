import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const GeneralPagination = (props) => {
  const { children, handlePage, pageNumber, numPages, startPage, endPage, next, prev, size } = props

  const pageNumberItems = []

  for (let i = startPage; i <= endPage; i++) {
    pageNumberItems.push((
      <PaginationItem key={`paginate-${i}`} active={pageNumber === i}>
        <PaginationLink onClick={(e) => handlePage(i)}>
          {i}
        </PaginationLink>
      </PaginationItem>
    ))
  }

  return (
    <Pagination size={size || 'sm'} className='pagination'>
      <PaginationItem disabled={pageNumber <= 1}>
        <PaginationLink disabled={pageNumber <= 1} previous onClick={(e) => handlePage(prev['page'])} />
      </PaginationItem>

      {pageNumberItems}

      <PaginationItem disabled={pageNumber >= numPages}>
        <PaginationLink disabled={pageNumber >= numPages} next onClick={(e) => handlePage(next['page'])} />
      </PaginationItem>
      <PaginationItem>
        {children}
      </PaginationItem>
    </Pagination>
  )
}

export default GeneralPagination
