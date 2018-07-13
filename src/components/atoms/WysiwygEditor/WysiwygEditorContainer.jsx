
import { compose, withStateHandlers, lifecycle, withState } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import { EditorState, convertToRaw, ContentState } from 'draft-js';

import WysiwygEditor from './WysiwygEditor'
import htmlToDraft from 'html-to-draftjs';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';



export default compose(
  withState('editorContent', 'setEditorContent', ({ content }) => {
    const html = '#### Local Services';
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  })
  // withStateHandlers(({ content }) => ({
  //   editorContent: {},
  // }),{
  //   setEditorContent: ({ editorContent }) => (payload) => ({ editorContent: payload })
  // }),
  // lifecycle({
  //   componentWillMount () {
  //     const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
  //     const contentBlock = htmlToDraft(html);
  //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //     const editorState = EditorState.createWithContent(contentState);
  //     this.props.setEditorContent(editorState)
  //   }
  // })
)(WysiwygEditor)
