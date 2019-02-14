
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose'
import TinyMCE from './TinyMCE'
import { api, notifier } from 'lib'
// import htmlToDraft from 'html-to-draftjs'
// import draftToHtml from 'draftjs-to-html'

// import showdown from 'showdown'

export default compose(
  withState('editorContent', 'setEditorContent', ({ content = '' }) => content),
  withHandlers({
    onChange: ({ handleEditorChange, setEditorContent }) => (newContent) => {
      handleEditorChange(newContent)
      setEditorContent(newContent)
    },
    onUpload: ({ baseApiRoute, getFileDownloadUrl }) => (blobInfo, success, failure) => {
      const file = {
        path: `upload/${blobInfo.filename()}`,
        content: blobInfo.base64(),
        encoding: 'base64'
      }

      const body = {
        files: [ file ],
        message: `[HT] Uploaded file: ${file.path}`
      }

      api.post(`${baseApiRoute}/files/upsert`, body).then(resp => {
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
