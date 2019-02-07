
import { compose, withState, withHandlers, withPropsOnChange } from 'recompose'
import TinyMCE from './TinyMCE'
import { api, notifier } from 'lib'
// import htmlToDraft from 'html-to-draftjs'
// import draftToHtml from 'draftjs-to-html'

// import showdown from 'showdown'

export default compose(
  withState('editorContent', 'setEditorContent', ({ content }) => content),
  withHandlers({
    onChange: ({ handleEditorChange, setEditorContent }) => (newContent) => {
      handleEditorChange(newContent)
      setEditorContent(newContent)
    },
    onUpload: ({ baseRoute, baseApiRoute, queryParams }) => (blobInfo, success, failure) => {
      console.log(Object.keys(blobInfo), blobInfo.id(), blobInfo.filename(), blobInfo.blobUri(), blobInfo.uri())
      console.log('handle blob', blobInfo.name(), blobInfo.base64())

      const file = {
        path: `upload/${blobInfo.filename()}`,
        content: blobInfo.base64(),
        encoding: 'base64'
      }

      const body = {
        files: [ file ],
        message: `Upload file: ${file.path}`
      }

      api.post(`${baseApiRoute}/files/upsert`, body).then(resp => {
        const fileUrl = `https://raw.githubusercontent.com/${baseRoute}/${queryParams['ref'] || 'master'}/${file.path}`
        notifier.success(`Uploaded file: ${file.path}`)
        success(fileUrl)
      }).catch(err => {
        notifier.bad(err)
        failure(err)
      })
    }
  }),
  withPropsOnChange(['content'], ({ content, setEditorContent }) => {
    setEditorContent(content)
  })
)(TinyMCE)
