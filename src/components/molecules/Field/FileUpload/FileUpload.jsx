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
          style={{ display: `${value ? 'block' : 'none'}` }}
          className='file-upload'
        />
      )}

      <br />
      <div className="inputfile">
        <div className="file-upload">
          <FileBase64
            multiple={false}
            onDone={handleFileUpload}
          />
          <div className='btn btn-sm btn-upload'><i className="fa fa-arrow-up"></i> Choose File</div>
        </div>
      </div>
    </FormGroup>
  )
}

export default FileUpload
