
import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextEditor } from 'atoms'
import { DeleteFileModal } from 'molecules'
import { imageExtensions } from 'helpers/lists'

const FileSingle = ({ file, content, parseFileExt, handleContentChange, permissions, saveFile, isDeleteModalOpen, toggleModal, deleteFile }) => {
  const fileExt = parseFileExt(file.name)
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
      {
        imageExtensions.includes(fileExt)
          ? <img alt='file' style={{ 'maxWidth': '90%' }} src={file['download_url']} />
          : <TextEditor
            content={content}
            name={file.name}
            onChange={handleContentChange}
            permissions={permissions}
          />
      }

      {
        permissions['push'] &&
          <div className='mt-3 mb-3'>
            <Button className='mr-3' onClick={() => saveFile(content)}>Save</Button>
            <Button className='mr-3' color='danger' onClick={toggleModal}>Delete</Button>
          </div>
      }
      <DeleteFileModal
        isOpen={isDeleteModalOpen}
        handleClick={deleteFile}
        toggleModal={toggleModal}
      />
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
