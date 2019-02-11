import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Title,
  Row
} from 'atoms'

import {
  FieldContainer
} from 'molecules'

import {
  RecursiveFields,
  TinyMCE
} from '..'

export const ItemForm = (props) => {
  const { activeItem, handleFormSubmit, editFileName, deleteItem, match, handleMarkdownChange, fileUploads, stagedFileUploads, setStagedFileUploads, ...rest } = props
  const { item } = match.params
  return (
    <Row>
      <Col sm='12' md='5' lg='5' xl='3'>
        <div className='tab-content-card'>
          {
            item === 'new'
              ? <FieldContainer
                type='text'
                label={'File name'}
                name={'file_name'}
                onChange={editFileName}
                value={activeItem['name']}
              />
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
            {...rest}
          />
          {/* <WysiwygEditor
            item={item}
            content={activeItem['markdown']}
            handleEditorChange={handleMarkdownChange}
          /> */}
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
