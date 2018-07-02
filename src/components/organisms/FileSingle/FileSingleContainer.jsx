/* global btoa */

import { compose, withStateHandlers, lifecycle } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import FileSingle from './FileSingle'

const nullConditionFn = ({ file }) => Object.keys(file).length === 0

export default compose(
  withMaybe(nullConditionFn),
  withStateHandlers(({ file }) => ({
    content: file['content']
  }), {
    setContent: ({ content }) => (payload) => ({ content: btoa(payload) })
  }),
  lifecycle({
    componentWillUnmount () {
      this.props.setFile({})
    }
  })
)(FileSingle)
