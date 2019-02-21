import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalBody,
  Button
} from 'atoms'
import { LastUpdated } from 'molecules'
import {
  CardTitle,
  CardBody
} from 'reactstrap'

const DeleteFileModal = ({ isOpen, handleClick, toggleModal }) => {
  return (
    <Modal title={`Are you sure you want delete this file?`} toggle={toggleModal} isOpen={isOpen}>
      <ModalBody>
        <div className='flex-row flex-center'>
          <div>Deleting this file will remove it from the repository.</div>
          <div className='flex-col flex-center'>
            <Button size='sm' onClick={toggleModal}>Cancel</Button>
            <Button size='sm' color={'danger'} onClick={handleClick}>Delete</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

DeleteFileModal.propTypes = {
  repo: PropTypes.object
}

export default DeleteFileModal
