import React from 'react'
import ErrorPage from './ErrorPage'
import { withEither } from '@bowtie/react-utils'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import { airbrake } from 'lib'

const hasErrorConditionalFn = ({ hasError }) => hasError

export default compose(
  withStateHandlers({
    hasError: false,
    error: {},
    errorInfo: {}
  }, {
    setHasError: () => (payload) => ({ hasError: payload }),
    setError: () => (payload) => ({ error: payload }),
    setErrorInfo: () => (payload) => ({ errorInfo: payload })
  }),
  lifecycle({
    componentDidCatch (error, errorInfo) {
      this.props.setError(error)
      this.props.setErrorInfo(errorInfo)
      this.props.setHasError(true)

      airbrake.notify({
        error,
        context: {
          errorInfo
        }
      })
    }
  }),
  withEither(hasErrorConditionalFn, ErrorPage)
)(({ children }) => <div>{children}</div>)
