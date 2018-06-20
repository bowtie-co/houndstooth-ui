import React from 'react'
import {
  TodoList,
  TodoDetail
} from '../../organisms'

const Demo = ({ todoList, todo, setTodo }) => {
  return (
    <div className='demo-template'>
      <TodoList todoList={todoList} setTodo={setTodo} />
      <TodoDetail todo={todo} />
    </div>
  )
}

export default Demo
