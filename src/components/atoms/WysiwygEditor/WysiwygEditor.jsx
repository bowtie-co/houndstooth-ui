import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const WysiwygEditor = (props) => {
  const { content, handleMarkdownChange } = props
  return (
      <Editor
        // editorState={content}
        // toolbarClassName="toolbarClassName"
        // wrapperClassName="wrapperClassName"
        // editorClassName="editorClassName"
        // onEditorStateChange={handleMarkdownChange}
      />
    // <RichTextEditor
    //   value={content || ''}
    //   // onChange={handleMarkdownChange}
    // />
  )
}

export default WysiwygEditor
