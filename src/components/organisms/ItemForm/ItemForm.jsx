import React from 'react'
import {
  Row,
  Title
} from '../../atoms'
import { FieldContainer } from '../../molecules'
import { RecursiveFields } from '..'

const ItemForm = (props) => {
  const { activeItem, handleFormSubmit, editFileName, match } = props
  const { item } = match.params
  console.log('Item form props: ', activeItem.fields)
  return (
    <section>
      <Row>
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
      </Row>
    </section>
  )
}

export default ItemForm
