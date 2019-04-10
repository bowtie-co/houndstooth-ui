import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Icon } from 'atoms'
import { DeleteFileModal } from 'molecules'
import FieldGroup from './FieldGroup'

const RecursiveFields = (props) => {
  const { onSubmit, formData, fields, deleteItem, location, isDeleteModalOpen, toggleModal, ...rest } = props
  return (
    <div>
      <Row>
        <Col>
          <FieldGroup fields={formData} {...rest} />
        </Col>
      </Row>

      {
        !rest['disabled'] &&
          <div style={{ 'padding': '20px 0px 15px 5px' }}>
            <Row>
              <Col sm='6'>
                <div className='flex align-center justify-content-start'>
                  <Icon
                    onClick={toggleModal}
                    iconName='trash-alt'
                    color='#ff3500'
                    size='sm'
                    id='delete-item-icon'
                    tooltip='Delete file'
                    placement='top'
                  />
                </div>
              </Col>
              <Col sm='6'>
                <div className='flex align-center justify-content-end'>
                  <Button onClick={() => onSubmit(formData)}>
                      Save
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
      }

      <DeleteFileModal
        isOpen={isDeleteModalOpen}
        handleClick={deleteItem}
        toggleModal={toggleModal}
      />
    </div>
  )
}

RecursiveFields.propTypes = {
  formData: PropTypes.object.isRequired,
  fields: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default RecursiveFields
