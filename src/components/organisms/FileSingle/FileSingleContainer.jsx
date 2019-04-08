/* global btoa */
import { compose, withStateHandlers, lifecycle, withPropsOnChange, withHandlers } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import FileSingle from './FileSingle'
import { withFormatting } from 'helpers'

const nullConditionFn = ({ file }) => Object.keys(file).length === 0

export default compose(
  withFormatting,
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
