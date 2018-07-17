import React from 'react'
import FileBase64 from 'react-file-base64'
import { titleize } from '@bowtie/utils'

const FileUpload = ({ value, handleFileUpload, fileUrl, name, identifier }) => {
  return (
    <div>
      <img style={{ maxWidth: '300px', display: `${value ? 'block' : 'none'}` }} id={identifier} src={fileUrl} alt='' />
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
