import React from 'react'
import FileBase64 from 'react-file-base64'
import { titleize } from '@bowtie/utils'
import { FormGroup } from 'atoms'

const FileUpload = (props) => {
  const { name, value, handleFileUpload, previewUrl } = props

  return (
    <FormGroup>
      <p>{titleize(name, '_')}</p>
      <p className='truncate'>{value}</p>

      { previewUrl && (
        <img
          src={previewUrl}
          alt={name}
          style={{ maxWidth: '300px', display: `${value ? 'block' : 'none'}` }}
        />
      )}

      <br />

      <FileBase64
        multiple={false}
        onDone={handleFileUpload}
      />
    </FormGroup>
  )
}

export default FileUpload
