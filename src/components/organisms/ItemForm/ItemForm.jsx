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
  WysiwygEditor
} from '..'

export const ItemForm = (props) => {
  const { activeItem, handleFormSubmit, editFileName, deleteItem, match, handleMarkdownChange, fileUploads, stagedFileUploads, setStagedFileUploads } = props
  const { item } = match.params
  console.log('Item form props: ', activeItem.fields)
  return (
    <Row>
      <Col sm='5' className='tab-content-card'>
        {
          item === 'new'
            ? <FieldContainer
              type='text'
              label={'File name'}
              name={'file_name'}
              onChange={editFileName}
              value={activeItem['name']}
            />
            : <Title title={item} />
        }
        <RecursiveFields
          fields={activeItem['fields']}
          match={match}
          onSubmit={handleFormSubmit}
          deleteItem={deleteItem}
          fileUploads={fileUploads}
          stagedFileUploads={stagedFileUploads}
          setStagedFileUploads={setStagedFileUploads}
        />
      </Col>
      <Col sm='6' className='tab-content-card'>
        <WysiwygEditor
          item={item}
          content={activeItem['markdown']}
          handleEditorChange={handleMarkdownChange}
        />
      </Col>
    </Row>

  )
}

/** ************** EMPTY STATE ************** */

export const EmptyState = (props) => {
  return (
    <Row>
      <Col className='tab-content-card' sm='4'>
        <div>Select a file to edit</div>
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
