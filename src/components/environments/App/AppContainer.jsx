// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { withRouter } from 'react-router'
import { compose, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import App from './App'
import { Loading } from '../../atoms'
import qs from 'qs'

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
