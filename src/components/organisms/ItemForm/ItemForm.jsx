import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Title
} from '../../atoms'
import { FieldContainer } from '../../molecules'
import { RecursiveFields, WysiwygEditor } from '..'

const ItemForm = (props) => {
  const { activeItem, handleFormSubmit, editFileName, match, handleMarkdownChange, fileUploads, stagedFileUploads, setStagedFileUploads } = props
  const { item } = match.params
  console.log('Item form props: ', activeItem.fields)
  return (
    <section>
      <Col>
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
          fileUploads={fileUploads}
          stagedFileUploads={stagedFileUploads}
          setStagedFileUploads={setStagedFileUploads}
        />
        <WysiwygEditor
          item={item}
          content={activeItem['markdown']}
          handleEditorChange={handleMarkdownChange}
        />
      </Col>
    </section>
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

export default ItemForm
