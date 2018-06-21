import React from 'react'
import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Title, Subtitle } from '../../atoms'

/** ********** BASE COMPONENT **********/

const TodoDetail = ({ todo }) => {
  return (
    <section className='todo-detail-section' id={`todo-${todo.id}`}>
      <p>{todo.title}</p>
      <p>{todo.content}</p>
    </section>
  )
}

/** ********** EMPTY STATE **********/

const emptyConditionFn = ({ todo }) => !todo || !todo.title
const EmptyState = () => <section className='todo-detail-section'><Subtitle title={'Select a todo'} /></section>

export default compose(
  withEither(emptyConditionFn, EmptyState)
)(TodoDetail)
