import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const WysiwygEditor = (props) => {
  const { editorState, onChange } = props
  return (
    <div className='wysiwyg-section'>
      <Editor
        editorState={editorState}
        wrapperClassName='demo-wrapper'
        editorClassName='demo-editor'
        onEditorStateChange={onChange}
      />
    </div>
  )
}

WysiwygEditor.propTypes = {
  editorState: PropTypes.object,
  onChange: PropTypes.func
}

export default WysiwygEditor
