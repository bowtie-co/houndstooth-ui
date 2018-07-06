import React from 'react'
import { titleize } from '@bowtie/utils'
import {
  Row,
  Title
} from '../../atoms'
import { FieldContainer } from '../../molecules'
import { Form } from '../../organisms'

const ItemForm = (props) => {
  const { activeItem, defaultFields, formSubmit } = props
  console.log('default Fields', defaultFields)
  return (
    <section>
      <Title title={activeItem['name'] ? activeItem['name'] : `Your New Item`} />
      <Row>
        <Form model={activeItem['fields'] ? activeItem['fields'] : defaultFields} onSubmit={formSubmit}>
          {
            Object.keys(defaultFields).map((field, i) => {
              return (
                <FieldContainer
                  key={i}
                  label={titleize(field, '_')}
                  name={field}
                />
              )
            })
          }
        </Form>
      </Row>
    </section>
  )
}

export default ItemForm
