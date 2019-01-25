
// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.
import qs from 'qs'
import { compose, withPropsOnChange, withHandlers } from 'recompose'
import { withRouter } from 'react-router'
import deepMerge from 'deepmerge'

export default compose(
  withRouter,
  withPropsOnChange(
    ({ location }, { location: nextLocation }) => nextLocation.search !== location.search,
    ({ location }) => ({ queryParams: qs.parse(location.search, { ignoreQueryPrefix: true }) })
  ),
  withHandlers({
    updateQueryParams: ({ queryParams, history }) => (data) => {
      data = deepMerge(queryParams, data)

      Object.keys(data).forEach(key => {
        if (data[key] === null || typeof data[key] === 'undefined') {
          delete data[key]
        }
      })

      history.push(`?${qs.stringify(data, { encodeValuesOnly: true, arrayFormat: 'brackets' })}`)
    },
    deepMergeQueryParams: ({ queryParams }) => (data) => {
      data = deepMerge(queryParams, data)

      Object.keys(data).forEach(key => {
        if (data[key] === null || typeof data[key] === 'undefined') {
          delete data[key]
        }
      })

      return `?${qs.stringify(data, { encodeValuesOnly: true, arrayFormat: 'brackets' })}`
    }
  })
)
