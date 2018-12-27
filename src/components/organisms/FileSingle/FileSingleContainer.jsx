/* global btoa */
import { compose, withStateHandlers, lifecycle, withPropsOnChange, withHandlers } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import FileSingle from './FileSingle'

const nullConditionFn = ({ file }) => Object.keys(file).length === 0

export default compose(
  withMaybe(nullConditionFn),
  withStateHandlers(({ file }) => ({
    content: file['content']
  }), {
    setContent: ({ content }) => (payload) => ({ content: payload })
  }),
  withHandlers({
    handleContentChange: ({ setContent }) => (content) => {
      setContent(btoa(content))
    }
  }),
  lifecycle({
    componentWillUnmount () {
      this.props.setFile({})
    }
  }),
  withPropsOnChange(['file'], ({ file, setContent }) => {
    setContent(file['content'])
  })
)(FileSingle)
