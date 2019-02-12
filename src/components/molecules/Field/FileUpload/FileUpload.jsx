import React from 'react'
import FileBase64 from 'react-file-base64'
import { titleize } from '@bowtie/utils'
import { FormGroup, Icon } from 'atoms'

const FileUpload = (props) => {
  const { name, value, handleFileUpload, previewUrl, deleteImage } = props

  return (
    <div>
      <p>{titleize(name, '_')}
        {
          value &&
          <Icon onClick={deleteImage} iconName={'trash'} />
        }
      </p>
      <p className='truncate'>{value}</p>
      <FormGroup>

        { previewUrl && (
          <img
            src={previewUrl}
            alt={name}
            style={{ display: `${value ? 'block' : 'none'}` }}
            className='file-upload'
          />
        )}

        <br />
        <div className='inputfile'>
          <div className='file-upload'>
            <FileBase64
              multiple={false}
              onDone={handleFileUpload}
            />
            <div className='btn btn-sm btn-upload'><i className='fa fa-arrow-up' /> Choose File</div>
          </div>
        </div>
      </FormGroup>
    </div>
  )
}

export default FileUpload
