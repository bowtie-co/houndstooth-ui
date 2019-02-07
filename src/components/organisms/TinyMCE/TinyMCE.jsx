import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TinyMCE = (props) => {
  const { editorContent, onChange } = props
  return (
    <div className='wysiwyg-section'>
      <Editor
        init={{
          height: '100%',
          plugins: 'link image code media hr lists fullscreen',
          menubar: 'false',
          toolbar1: 'undo redo | fontselect fontsizeselect | link media image',
          toolbar2: 'formatselect bold italic underline superscript hr | alignleft aligncenter alignright | bullist | removeformat | fullscreen code',
          content_style: 'img {max-width: 100%;}'
        }}
        apiKey={'kpkfdogbexo2stz9zphjxq28zit6i9tch0ox4vlu1meo75hn'}
        value={editorContent}
        onEditorChange={onChange}
      />
    </div>
  )
}

TinyMCE.propTypes = {
  editorContent: PropTypes.object,
  onChange: PropTypes.func
}

export default TinyMCE
