import React from 'react'
import { titleize } from '@bowtie/utils'
import {
  Row,
  Subtitle,
  Title
} from '../../atoms'
import { FieldContainer } from '../../molecules'
import { Form } from '../../organisms'

const ItemList = (props) => {
  const { activeItem, defaultFields, formSubmit } = props
  return (
    <section>
      <Title title={activeItem['name'] ? activeItem['name'] : `Your New Item`} />
      <Row>
        <Form model={activeItem['fields'] ? activeItem['fields'] : defaultFields} onSubmit={formSubmit}>
          {
            Object.keys(defaultFields).map((field, i) => {
              return (
                <FieldContainer
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

/**********************************
EMPTY STATE
**********************************/

export const EmptyState = () => <Subtitle title={'You must select a collection'} />

export default ItemList
