import React from 'react'
import { Todo } from '../../molecules'

const TodoList = ({ todoList = [], setTodo }) => {
  return (
    <section className='todo-list-section' >
      {
        todoList.length && todoList.map((todo, i) => {
          const { title, content, favorite } = todo
          return (
            <Todo title={title} content={content} favorite={favorite} handler={() => setTodo(todo)} />
          )
        })
      }
    </section>
  )
}

export default TodoList
