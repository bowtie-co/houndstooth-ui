
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose'
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
  }),
  withPropsOnChange(['content'], ({ content, setEditorContent }) => {
    setEditorContent(content)
  })
)(TinyMCE)
