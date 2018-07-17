
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose'
import { EditorState, convertToRaw, ContentState } from 'draft-js'

import WysiwygEditor from './WysiwygEditor'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'

import showdown from 'showdown'

export default compose(
  withState('editorState', 'setEditorState', EditorState.createEmpty()),
  withHandlers({
    onChange: ({ handleEditorChange, setEditorState }) => (editorState) => {
      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      handleEditorChange(content)
      setEditorState(editorState)
    }
  }),
  withPropsOnChange(
    ({ item, content }, { item: nextItem, content: nextContent }) => item !== nextItem && content !== nextContent,
    ({ item, content, setEditorState }) => {
      const converter = new showdown.Converter()
      const html = converter.makeHtml(content)
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    })
)(WysiwygEditor)
