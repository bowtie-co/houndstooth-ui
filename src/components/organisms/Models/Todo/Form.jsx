import React from 'react'
import { Form } from '../../'
import { FieldContainer } from '../../../molecules'
import { Title } from '../../../atoms'

/** ********** BASE COMPONENT **********/

const TodoForm = ({ todo, formSubmit, modelName }) => {
  const form = { title: 'this is a title', description: 'description', importance: 'not very important' }
  return (
    <section>
      <Title title={`Your ${modelName}`} />
      <Form model={todo} onSubmit={formSubmit}>
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
