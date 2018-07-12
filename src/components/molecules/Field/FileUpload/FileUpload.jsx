import React from 'react'
import FileBase64 from 'react-file-base64'
import { titleize } from '@bowtie/utils'

const FileUpload = ({ field, handleFileUpload, fileUrl, name }) => {
  return (
    <div>
      <img style={{ maxWidth: '300px' }} src={fileUrl} alt='' />
      <p>{titleize(name, '_')}</p>
      <p>{field}</p>
      <FileBase64
        multiple={false}
        onDone={handleFileUpload} />
    </div>
  )
}

export default FileUpload
