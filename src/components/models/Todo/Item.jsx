import React from 'react'
import {
  Subtitle,
  Summary,
  Favorite
} from '../../atoms'

const TodoItem = ({ title, content, favorite = false, handler }) => {
  return (
    <section className='todo-section' onClick={handler}>
      <Favorite className='todo-item' favorite={favorite} />
      <Subtitle title={title} />
      <Summary content={content} />
    </section>
  )
}

export default TodoItem
