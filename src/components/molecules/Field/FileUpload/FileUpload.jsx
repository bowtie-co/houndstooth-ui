import React from 'react'
import FileBase64 from 'react-file-base64'
import { titleize } from '@bowtie/utils'
import { FormGroup } from 'atoms'

const FileUpload = ({ value, handleFileUpload, fileUrl, name, previewId, isLoadingFileUrl }) => {
  return (
    <FormGroup>
      <p>{titleize(name, '_')}</p>

      { isLoadingFileUrl && <p>Loading ...</p> }

      <img style={{ maxWidth: '300px', display: `${value ? 'block' : 'none'}` }} id={previewId} src={fileUrl} alt={`${name} not cached yet ...`} />

      <p className='truncate'>{value}</p>

      <FileBase64
        multiple={false}
        onDone={handleFileUpload}
      />
    </FormGroup>
  )
}

export default FileUpload
