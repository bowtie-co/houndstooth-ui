import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { api } from 'lib'

const TinyMCE = (props) => {
  const { baseRoute, queryParams, editorContent, onChange, baseApiRoute } = props

  return (
    <div className='wysiwyg-section'>
      <Editor
        // inline
        init={{
          height: '100%',
          plugins: 'link image code media hr lists fullscreen',
          menubar: 'false',
          toolbar1: 'undo redo | fontselect fontsizeselect | link media image',
          toolbar2: 'formatselect bold italic underline superscript hr | alignleft aligncenter alignright | bullist | removeformat | fullscreen code',
          content_style: 'img {max-width: 100%;}',
          // file_picker_types: 'file image media',
          images_upload_handler: (blobInfo, success, failure) => {
            console.log(Object.keys(blobInfo), blobInfo.id(), blobInfo.filename(), blobInfo.blobUri(), blobInfo.uri())
            console.log('handle blob', blobInfo.name(), blobInfo.base64())

            const body = {
              files: [{
                path: blobInfo.filename(),
                content: blobInfo.base64(),
                encoding: 'base64'
              }],
              message: 'File Upload'
            }

            api.post(`${baseApiRoute}/files/upsert`, body).then(resp => {
              const fileUrl = `https://raw.githubusercontent.com/${baseRoute}/${queryParams['ref'] || 'master'}/${blobInfo.filename()}`
              success(fileUrl)
            }).catch(failure)
          }
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
