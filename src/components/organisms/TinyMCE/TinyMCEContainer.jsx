
import { compose, withState, withHandlers } from 'recompose'
import TinyMCE from './TinyMCE'
// import htmlToDraft from 'html-to-draftjs'
// import draftToHtml from 'draftjs-to-html'

// import showdown from 'showdown'

export default compose(
  withState('editorContent', 'setEditorContent', ({ content }) => content),
  withHandlers({
    onChange: ({ handleEditorChange, setEditorContent }) => (newContent) => {
      handleEditorChange(newContent)
      setEditorContent(newContent)
    }
  })
)(TinyMCE)
