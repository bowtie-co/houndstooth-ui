import React from 'react'
import FileBase64 from 'react-file-base64'
import { lists } from 'helpers'

import { titleize } from '@bowtie/utils'
import { FormGroup, Icon, ExtLink } from 'atoms'

const FileUpload = (props) => {
  const { name, value, handleFileUpload, previewUrl, deleteImage, fileUrl, disabled } = props
  const { fileIcons, errorMessages } = lists

  return (
    <div>
      <p>{titleize(name, '_')}
        {
          value && !disabled &&
          <Icon onClick={deleteImage} iconName={'trash'} />
        }
      </p>
      <p className='truncate'>
        { fileUrl && /^https?:\/\//.test(fileUrl) ? <ExtLink href={fileUrl}>{value}</ExtLink> : value }
      </p>

      <FormGroup errorMessage={errorMessages[previewUrl]}>
        {
          previewUrl && fileIcons[previewUrl]
            ? <div style={{ display: `${value ? 'flex' : 'none'}` }} className='flex-center'>
              <Icon className={fileIcons[previewUrl]} size='xxl' />
            </div>
            : <div style={{ display: `${value ? 'flex' : 'none'}` }} className='flex-center'>
              <img
                src={previewUrl}
                alt={name}
                onError={(e) => { e.target.src = '/loading.svg' }}
                className='file-upload'
              />
            </div>
        }

        <br />

        {
          !disabled &&
            <div className='inputfile'>
              <div className='file-upload'>
                <FileBase64
                  multiple={false}
                  onDone={handleFileUpload}
                />
                <div className='btn btn-sm btn-upload'><i className='fa fa-arrow-up' /> Choose File</div>
              </div>
            </div>
        }
      </FormGroup>
    </div>
  )
}

export default FileUpload
