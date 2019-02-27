import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Title,
  Row,
  Icon
} from 'atoms'

import {
  FieldContainer
} from 'molecules'

import {
  RecursiveFields,
  TinyMCE
} from '..'

const IconHelper = () => (
  <Icon
    iconName='question-circle'
    id='filename-helper-icon'
    tooltip={'Filename cannot include spaces or special characters. If an extension does not exist, the file will default to .md'}
    placement='top'
  />
)

export const ItemForm = (props) => {
  const { activeItem, handleFormSubmit, handleFileNameChange, fileNameError, editFileName, deleteItem, match, handleMarkdownChange, fileUploads, stagedFileUploads, setStagedFileUploads, permissions, ...rest } = props
  const { item } = match.params
  return (
    <Row>
      <Col sm='12' md='5' lg='5' xl='3'>
        <div className='tab-content-card'>
          {
            item === 'new'

              ? <div>
                <FieldContainer
                  type='text'
                  label={'File name'}
                  name={'file_name'}
                  onChange={editFileName}
                  iconHelper={IconHelper}
                  value={handleFileNameChange(activeItem['name'])}
                  errorMessage={fileNameError}
                />
              </div>
              : <Title title={item} className='break-word' />
          }
          <RecursiveFields
            fields={activeItem['fields']}
            match={match}
            onSubmit={handleFormSubmit}
            deleteItem={deleteItem}
            fileUploads={fileUploads}
            stagedFileUploads={stagedFileUploads}
            setStagedFileUploads={setStagedFileUploads}
            disabled={!permissions['push']}
            {...rest}
          />
        </div>
      </Col>
      <Col sm='12' md='7' lg='7' xl='9'>
        <div className='tab-content-card'>
          <TinyMCE
            item={item}
            content={activeItem['markdown']}
            handleEditorChange={handleMarkdownChange}
            disabled={!permissions['push']}
            {...rest}
          />
        </div>
      </Col>
    </Row>

  )
}

/** ************** EMPTY STATE ************** */

export const EmptyState = (props) => {
  return (
    <Row>
      <Col className='tab-content-card' sm='12' style={{ 'border': '0', 'width': '100%', 'box-shadow': 'none' }}>
        <div className='file-select'><em>Select a file to edit</em></div>
      </Col>

    </Row>
  )
}

ItemForm.propTypes = {
  activeItem: PropTypes.object,
  fileUploads: PropTypes.object,
  stagedFileUploads: PropTypes.array,
  handleFormSubmit: PropTypes.func,
  editFileName: PropTypes.func,
  handleMarkdownChange: PropTypes.func,
  setStagedFileUploads: PropTypes.func
}
