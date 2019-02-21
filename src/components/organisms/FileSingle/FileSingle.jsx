
import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextEditor } from 'atoms'

const FileSingle = ({ file, content, handleContentChange, permissions, saveFile }) => {
  return (
    <div style={{ 'padding': '20px 0', 'width': '100%' }}>
      <div className='d-flex align-items-center justify-content-between'>
        <h2>{file.name}</h2>
        {
          permissions['push'] &&
            <Button
              onClick={() => saveFile(content)}
              className='btn-sm mt-3 mb-3'
              style={{ 'padding': '0.5em 3em', 'min-height': '24px' }}>
              Save
            </Button>
        }
      </div>
      <TextEditor
        content={content}
        name={file.name}
        onChange={handleContentChange}
        permissions={permissions}
      />
      {
        permissions['push'] && <Button onClick={() => saveFile(content)} className='mt-3'>Save</Button>
      }
    </div>
  )
}

FileSingle.propTypes = {
  file: PropTypes.object,
  content: PropTypes.string,
  setContent: PropTypes.func,
  saveFile: PropTypes.func
}

export default FileSingle
