import React from 'react'
import { Form } from '../../'
import { FieldContainer } from '../../../molecules'
import { Title } from '../../../atoms'

/** ********** BASE COMPONENT **********/

const TodoForm = ({ todo, formSubmit }) => {
  return (
    <section>
      <Title title={'Title with extra props'} />
      <Form onSubmit={formSubmit}>
        <FieldContainer
          type={'text'}
          label={'Todo'}
          placeholder={'todo title here'}
          name={'title'}
        />
        <FieldContainer
          type={'text'}
          label={'Description'}
          placeholder={'description here'}
          name={'description'}
        />
      </Form>
    </section>
  )
}

export default TodoForm
