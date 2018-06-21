import React from 'react'
import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Form } from '../../'
import { FieldContainer } from '../../../molecules'
import { Title, Subtitle } from '../../../atoms'

/** ********** BASE COMPONENT **********/

const TodoForm = ({ todo }) => {
  return (
    <Form>
      <Title title={'Title with extra props'}/>
      <FieldContainer
        type={'text'}
        label={'Driver Name'}
        placeholder={'John Smith'}
        name={'name'}
        // value={formData['name'] || ''}
        // onChange={onChange}
        // required
      />
    </Form>
  )
}

export default TodoForm
