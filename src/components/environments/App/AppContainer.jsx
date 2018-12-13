// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import qs from 'qs'
import App from './App'
import { withRouter } from 'react-router'
import { compose, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Loading } from 'atoms'
import { withQueryParams } from 'helpers'

// conditional functions here:
const loadingConditionFn = (props) => props.isLoading

export const enhance = compose(
  withRouter,
  withEither(loadingConditionFn, Loading),
  withQueryParams
)

export default enhance(App)
