import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TinyMCE = (props) => {
  const { editorContent, onChange, onUpload } = props

  return (
    <div className='wysiwyg-section'>
      <Editor
        // inline
        init={{
          height: '100%',
          plugins: 'link image code hr lists fullscreen media',
          menubar: 'false',
          toolbar1: 'undo redo | fontselect fontsizeselect | link media image',
          toolbar2: 'formatselect bold italic underline superscript hr | alignleft aligncenter alignright | bullist | removeformat | fullscreen code',
          content_style: 'img {max-width: 100%;}',
          // file_picker_types: 'file image media',
          images_upload_handler: onUpload
        }}
        apiKey={'kpkfdogbexo2stz9zphjxq28zit6i9tch0ox4vlu1meo75hn'}
        value={editorContent}
        onEditorChange={onChange}
        // plugins={'code image imagetools'}
        // toolbar={'code image preview imageoptions media'}
      />
    </div>
  )
}

TinyMCE.propTypes = {
  editorContent: PropTypes.object,
  onChange: PropTypes.func
}

export default TinyMCE
