import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalBody,
  Button,
  Row,
  Col
} from 'atoms'

const RenameFileModal = ({ isOpen, handleClick, toggleModal }) => {
  return (
    <Modal toggle={toggleModal} isOpen={isOpen}>
      <ModalBody>
        <Row>
          <Col sm='12' className='flex-row flex-center mb-4'>Are you sure you want to rename this file?</Col>
          <Col sm='6' className='flex-row flex-center'><Button size='sm' onClick={toggleModal}>Cancel</Button></Col>
          <Col sm='6' className='flex-row flex-center'><Button size='sm' color={'success'} onClick={handleClick}>Save</Button></Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

RenameFileModal.propTypes = {
  repo: PropTypes.object
}

export default RenameFileModal
