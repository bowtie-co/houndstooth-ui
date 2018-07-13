import React from 'react'
import {
  Col,
  Title
} from '../../atoms'
import { FieldContainer } from '../../molecules'
import { RecursiveFields, WysiwygEditor } from '..'

const ItemForm = (props) => {
  const { activeItem, handleFormSubmit, editFileName, match, handleMarkdownChange } = props
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

export default ItemForm
