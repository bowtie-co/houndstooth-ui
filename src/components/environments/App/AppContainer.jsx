// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import qs from 'qs'
import App from './App'
import { withRouter } from 'react-router'
import { compose, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Loading } from 'atoms'

// conditional functions here:
const loadingConditionFn = (props) => props.isLoading

export const enhance = compose(
  withRouter,
  withEither(loadingConditionFn, Loading),
  withPropsOnChange(
    ({ location }, { location: nextLocation }) => nextLocation.search !== location.search,
    ({ location }) => ({ queryParams: qs.parse(location.search, { ignoreQueryPrefix: true }) })
  )
)

export default enhance(App)
