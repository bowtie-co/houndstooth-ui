import React from 'react'
import { withEither } from '@bowtie/react-utils'
import { Icon } from '..'

/** ****** conditional fn ****** */
const sortableConditionalFn = ({ sortBy }) => sortBy

/** ****** base components ****** */

const ThWithSorting = ({ children, title, sortBy, isSorted, direction, handleAscending, handleDescending, ...rest }) => {
  let SortableIcon = isSorted && direction === 'ASC'
    ? () => <Icon iconName='sort-up' onClick={handleDescending} />
    : () => <Icon iconName='sort-down' onClick={handleAscending} />

  return (
    <th {...rest}>
      { title || children }
      {
        isSorted
          ? <SortableIcon />
          : <Icon iconName='sort' onClick={handleAscending} />
      }
    </th>
  )
}

const TH = ({ children, title, ...rest }) => {
  return (
    <th {...rest}>
      {title || children}
    </th>
  )
}

export default withEither(sortableConditionalFn, ThWithSorting)(TH)
