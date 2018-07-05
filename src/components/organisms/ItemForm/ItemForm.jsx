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
  const { activeItem, fields } = props
  return (
    <section>
      <Title title={`Your New Item`} />
      <Row>
        <Form model={activeItem['fields'] ? activeItem['fields'] : fields}>
          {
            Object.keys(fields).map((field, i) => {
              return (
                <FieldContainer
                  // type={'text'}
                  label={titleize(field, '_')}
                  placeholder={'todo title here'}
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
