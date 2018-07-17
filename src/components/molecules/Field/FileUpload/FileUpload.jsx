import React from 'react'
import FileBase64 from 'react-file-base64'
import { titleize } from '@bowtie/utils'

const FileUpload = ({ value, handleFileUpload, fileUrl, name, previewId }) => {
  return (
    <div>
      <img style={{ maxWidth: '300px', display: `${value ? 'block' : 'none'}` }} id={previewId} src={fileUrl} alt='' />
      <p>{titleize(name, '_')}</p>
      <p>{value}</p>
      <FileBase64
        multiple={false}
        onDone={handleFileUpload}
      />
    </div>
  )
}

export default FileUpload
