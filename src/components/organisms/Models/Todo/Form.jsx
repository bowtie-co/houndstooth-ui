import React from 'react'
import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Title, Subtitle } from '../../../atoms'

/** ********** BASE COMPONENT **********/

const TodoForm = ({ todo }) => {
  return (
    <section className='todo-detail-section' id={`todo-${todo.id}`}>
      This is a form
    </section>
  )
}

export default TodoForm
