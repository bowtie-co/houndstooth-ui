import React from 'react'
import { Form } from '../../'
import { FieldContainer } from '../../../molecules'
import { Title } from '../../../atoms'

/** ********** BASE COMPONENT **********/

const TodoForm = ({ todo, formSubmit, model_name }) => {
  const form = { title: "this is a title", description: "description", importance: "not very important" }
  return (
    <section>
      <Title title={`Your ${model_name}`} />
      <Form model={form} onSubmit={formSubmit}>
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
        <FieldContainer
          type={'select'}
          label={'Importance'}
          options={['not very important', 'important', 'REALLY important']}
          name={'importance'}
        />
      </Form>
    </section>
  )
}

export default TodoForm
