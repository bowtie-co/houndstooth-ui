import React from 'react'
import {
  Row,
  Subtitle,
  Title
} from '../../atoms'
import { FieldContainer } from '../../molecules'
import { Form } from '../../organisms'

const ItemList = (props) => {
  const { activeItem, fields } = props
  return (
    <section>
      <Title title={`Your New Item`} />
      <Row>
        <Form model={activeItem ? activeItem['fields'] : null}>
          {
            Object.keys(fields).map((field, i) => {
              return (
                <FieldContainer
                  type={'text'}
                  label={'Todo'}
                  placeholder={'todo title here'}
                  name={'title'}
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
