import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { withMaybe } from '@bowtie/react-utils'

const nullConditionalFn = ({ next, prev }) => !(prev || next)

const GeneralPagination = (props) => {
  const { children, handlePage, pageNumber, last, next, prev, size, maxItems = 12 } = props
  const numPages = last ? last['page'] : null

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
      endPage = numPages || 6
    }
    console.log('startPage:', startPage)
    console.log('endPage:', endPage)
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
}

// export default GeneralPagination
export default withMaybe(nullConditionalFn)(GeneralPagination)
