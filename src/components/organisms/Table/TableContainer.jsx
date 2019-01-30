import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { withRouter } from 'react-router'
import Table from './Table'

export default compose(
  withRouter,
  withHandlers({
    handleAscending: ({ history, location, queryParams, updateQueryParams }) => (sortBy) => {
      updateQueryParams({
        sort_by: {
          col: sortBy,
          dir: 'ASC'
        }
      })
    },
    handleDescending: ({ history, location, queryParams, updateQueryParams }) => (sortBy) => {
      updateQueryParams({
        sort_by: {
          col: sortBy,
          dir: 'DESC'
        }
      })
    }
  }),
  withProps(({ children, queryParams, handleAscending, handleDescending }) => {
    // editableModel is not able to default to {}, which is why we are assigning defaultModelObj
    const mapFieldsWithProps = (children) => {
      return React.Children.map(children, child => {
        if (child && child.props && child.props.sortBy) {
          return React.cloneElement(child, {
            handleAscending: () => handleAscending(child.props.sortBy),
            handleDescending: () => handleDescending(child.props.sortBy),
            isSorted: queryParams['sort_by'] ? queryParams['sort_by']['col'] === child.props.sortBy : false,
            direction: queryParams['sort_by'] ? queryParams['sort_by']['dir'] : null
          })
        } else if (child && child.props && child.props.children) {
          return React.cloneElement(child, {
            children: mapFieldsWithProps(child.props.children)
          })
        }
        return child
      })
    }
    return {
      childrenWithExtraProp: mapFieldsWithProps(children)
    }
  })
)(Table)
