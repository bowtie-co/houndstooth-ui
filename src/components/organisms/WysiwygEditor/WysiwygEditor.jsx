import React from 'react'
import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const WysiwygEditor = (props) => {
  const { editorState, onChange } = props
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName='demo-wrapper'
        editorClassName='demo-editor'
        onEditorStateChange={onChange}
      />
    </div>
  )
}

export default WysiwygEditor
