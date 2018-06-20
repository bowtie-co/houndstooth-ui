import React from 'react'
import { Todo } from '../../molecules'
import { NavLink } from '../../atoms'

const TodoDetail = ({ todo }) => {
  return (
    <section className='todo-list-section' >
      <p>{todo.title}</p>
      <p>{todo.content}</p>
    </section>
  )
}

export default TodoDetail
