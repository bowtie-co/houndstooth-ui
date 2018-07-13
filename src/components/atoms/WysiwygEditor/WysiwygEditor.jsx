import React from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const WysiwygEditor = (props) => {
  const { editorContent, content, setEditorContent } = props
  console.log("editorContent ",editorContent);
  return (
    <div>
      <Editor
        editorState={editorContent}
        // defaultEditorState={content}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={setEditorContent}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorContent.getCurrentContent()))}
      />
    </div>
  )
}

export default WysiwygEditor
