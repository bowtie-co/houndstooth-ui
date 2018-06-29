import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const GeneralPagination = (props) => {
  const { children, pageNumber, numPages, handlePage, size, maxItems = 6 } = props
  const pageNumberItems = []

  if (numPages === 1) {
    return null
  } else {
    const padded = Math.floor(maxItems / 2)
    let startPage = (pageNumber - padded > 1) ? (pageNumber - padded) : 1
    let endPage = startPage + maxItems - 1

    if (numPages - pageNumber < padded - 1) {
      let newStart = startPage - padded - 1 - (numPages - pageNumber)

      if (newStart > 1) {
        startPage = newStart
      }
    }

    if (endPage > numPages) {
      endPage = numPages
    }

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
      <Pagination size={size || 'sm'}>
        <PaginationItem disabled={pageNumber <= 1}>
          <PaginationLink previous onClick={(e) => handlePage(pageNumber - 1)} />
        </PaginationItem>
        {pageNumberItems}
        <PaginationItem disabled={pageNumber >= numPages}>
          <PaginationLink next onClick={(e) => handlePage(pageNumber + 1)} />
        </PaginationItem>
        <PaginationItem>
          {children}
        </PaginationItem>
      </Pagination>
    )
  }
}

export default GeneralPagination
