import React from 'react'
import { Todo } from '../../molecules'

const TodoList = ({ todoList = [] }) => {
  return (
    <section className='todo-list-section' >
      {
        todoList.length && todoList.map((todo, i) => {
          const { title, content, favorite } = todo
          return (
            <Todo title={title} content={content} favorite={favorite} />
          )
        })
      }
    </section>
  )
}

export default TodoList
