import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalBody,
  Button,
  Row,
  Col
} from 'atoms'

const DeleteFileModal = ({ isOpen, handleClick, toggleModal }) => {
  return (
    <Modal title={`Are you sure you want delete this file?`} toggle={toggleModal} isOpen={isOpen}>
      <ModalBody>
        <Row>
          <Col sm='12' className='flex-row flex-center mb-4'>Deleting this file will remove it from the repository.</Col>
          <Col sm='6' className='flex-row flex-center'><Button size='sm' onClick={toggleModal}>Cancel</Button></Col>
          <Col sm='6' className='flex-row flex-center'><Button size='sm' color={'danger'} onClick={handleClick}>Delete</Button></Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

DeleteFileModal.propTypes = {
  repo: PropTypes.object
}

export default DeleteFileModal
