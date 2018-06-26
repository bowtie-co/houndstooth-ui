import React from 'react'
import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Subtitle } from '../../atoms'
import { EditModelButton } from '../../molecules'

/** ********** BASE COMPONENT **********/

const CollectionSingle = ({ todo }) => {
  return (
    <section className='todo-detail-section' id={`todo-${todo.id}`}>
      <p>{todo.title}</p>
      <p>{todo.content}</p>
      <EditModelButton
        modelName={'repos'}
        modelId={todo.id}
        label={'Edit Todo'}
      />

    </section>
  )
}

/** ********** EMPTY STATE **********/

const emptyConditionFn = ({ todo }) => !todo || !todo.title
const EmptyState = () => <section className='todo-detail-section'><Subtitle title={'Select a todo'} /></section>

export default compose(
  withEither(emptyConditionFn, EmptyState)
)(CollectionSingle)
