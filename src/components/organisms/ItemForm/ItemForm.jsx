import React from 'react'
import { titleize } from '@bowtie/utils'
import {
  Row,
  Title
} from '../../atoms'
import { FieldContainer } from '../../molecules'
import { Form, RecursiveFields } from '..'

const ItemForm = (props) => {
  const { activeItem, formSubmit, editFileName, match } = props
  const { item } = match.params
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
        <Form model={activeItem['fields']} onSubmit={formSubmit}>
          <RecursiveFields 
            fields={activeItem['fields']}
            match={match}
          />
          {/* {
            Object.keys(activeItem['fields']).map((field, i) => {
              return (
                <FieldContainer
                  key={i}
                  label={titleize(field, '_')}
                  name={field}
                />
              )
            })
          } */}
        </Form>
      </Row>
    </section>
  )
}

export default ItemForm
