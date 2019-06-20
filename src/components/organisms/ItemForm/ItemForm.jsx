import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Title,
  Row,
  Icon
} from 'atoms'

import {
  FieldContainer,
  RenameFileModal
} from 'molecules'

import {
  RecursiveFields,
  TinyMCE
} from '..'
import { Resizable } from '../../../../node_modules/re-resizable/lib/index';

const IconHelper = () => (
  <Icon
    iconName='question-circle'
    id='filename-helper-icon'
    tooltip={'Filename cannot include spaces or special characters. If an extension does not exist, the file will default to .md'}
    placement='top'
  />
)

export const ItemForm = (props) => {
  const {
    setRenameFile,
    enterSave,
    cancelRename,
    isRenameFile,
    activeItem,
    handleFormSubmit,
    handleFileNameChange,
    fileNameError,
    editFileName,
    deleteItem,
    duplicateItem,
    match,
    handleBodyChange,
    fileUploads,
    stagedFileUploads,
    setStagedFileUploads,
    permissions,
    isNameModalOpen,
    isNewItem,
    saveRenameFile,
    toggleNameModal,
    openModal,
    ...rest
  } = props

  const { item } = match.params
  return (
    <Row>
      <Resizable
        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
        minWidth={250}
        maxWidth={400}
        bounds='window'
        defaultSize={{ width: 200 }}
        id='fields-card'
        className='tab-content-card'
      >
          {
            item === 'new' || isRenameFile
              ? <div>
                <FieldContainer
                  type={'text'}
                  label={'File name'}
                  name={'file_name'}
                  onChange={editFileName}
                  iconHelper={IconHelper}
                  value={handleFileNameChange(activeItem['name'])}
                  errorMessage={fileNameError}
                  onBlur={(val) => !isNewItem && openModal(val)}
                />
              </div>
              : <div className={'flex-row align-center'}>
                <Title title={activeItem['name']} className='break-word m-1' />
                <Icon title='Edit name' iconName={'pencil-alt'} onClick={() => setRenameFile(true)} />
                <Icon title='Duplicate' iconName={'copy'} onClick={duplicateItem} />
              </div>
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
      </Resizable>
      <Resizable
        enable={{ top: false, right: true, bottom: true, left: false, topRight: false, bottomRight: true, bottomLeft: false, topLeft: false }}
        minWidth={321}
        maxWidth={1000}
        minHeight={440}
        bounds='window'
        id='mce-card'
        className='tab-content-card'
      >
        <TinyMCE
          item={item}
          content={activeItem['body']}
          handleEditorChange={handleBodyChange}
          disabled={!permissions['push']}
          {...rest}
        />
      </Resizable>
      <RenameFileModal
        isOpen={isNameModalOpen}
        handleClick={saveRenameFile}
        toggleModal={cancelRename}
      />
    </Row>
  )
}

/** ************** EMPTY STATE ************** */

export const EmptyState = (props) => {
  return (
    <Row>
      <Col className='tab-content-card w-100' sm='12' style={{ 'border': '0', 'box-shadow': 'none' }}>
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
  handleBodyChange: PropTypes.func,
  setStagedFileUploads: PropTypes.func
}
