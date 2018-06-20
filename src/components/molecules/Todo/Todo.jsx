import React from 'react'
import {
  Subtitle,
  Summary,
  Favorite
} from '../../atoms'

const Todo = ({ title, content, favorite = false }) => {
  return (
    <section className='todo-section'>
      <Favorite className='todo-item' favorite={favorite} />
      <Subtitle title={title} />
      <Summary content={content} />
    </section>
  )
}

export default Todo
