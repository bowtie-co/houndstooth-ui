import React from 'react'
// import { compose, withHandlers } from 'recompose';
// import { connect } from 'react-redux';
// import * as actions from '../../actions/actions';
// import { bindActionCreators } from 'redux';

import FileBase64 from 'react-file-base64'

const FileUpload = ({ field, handleFileUpload, fileUrl }) => {
  // console.log("file upload field:", field);
  // const fileUrl = getUploadPreview(field)
  console.log('fileUrl', fileUrl)

  return (
    <div>
      <img style={{ maxWidth: '300px' }} src={fileUrl} alt='' />
      <p>file path: {field}</p>
      <FileBase64
        multiple={false}
        onDone={handleFileUpload} />
    </div>
  )
}

export default FileUpload
