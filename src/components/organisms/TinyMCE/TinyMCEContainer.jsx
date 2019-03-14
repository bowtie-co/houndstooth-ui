
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose'
import TinyMCE from './TinyMCE'
import { notifier, github } from 'lib'

export default compose(
  withState('editorContent', 'setEditorContent', ({ content = '' }) => content),
  withHandlers({
    onChange: ({ handleEditorChange, setEditorContent }) => (newContent) => {
      handleEditorChange(newContent)
      setEditorContent(newContent)
    },
    onUpload: ({ buildSdkParams, getFileDownloadUrl }) => (blobInfo, success, failure) => {
      const file = {
        path: `upload/${blobInfo.filename()}`,
        content: blobInfo.base64(),
        encoding: 'base64'
      }

      const body = buildSdkParams({
        files: [file],
        message: `[HT] Uploaded file: ${file.path}`
      }, false)

      console.log('SDK Tiny MCE upload', body)

      github.upsertFiles(body)
        .then(resp => {
          getFileDownloadUrl(file.path).then(fileUrl => {
            notifier.success(`Uploaded file: ${file.path}`)
            success(fileUrl)
          })
        }).catch(err => {
          notifier.bad(err)
          failure(err)
        })
    }
  }),
  withPropsOnChange(['content'], ({ content = '', setEditorContent }) => {
    setEditorContent(content)
  })
)(TinyMCE)
