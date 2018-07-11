import React from 'react'
// import { compose, withHandlers } from 'recompose';
// import { connect } from 'react-redux';
// import * as actions from '../../actions/actions';
// import { bindActionCreators } from 'redux';

import FileBase64 from 'react-file-base64'

const FileUpload = ({ field, handleFileUpload, fileUrl, name }) => {
  return (
    <div>
      <img style={{ maxWidth: '300px' }} src={fileUrl} alt='' />
      <p>{name}</p>
      <p>{field}</p>
      <FileBase64
        multiple={false}
        onDone={handleFileUpload} />
    </div>
  )
}

export default FileUpload
