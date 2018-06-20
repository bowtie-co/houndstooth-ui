import React from 'react'
import {
  TodoList,
  TodoDetail
} from '../../organisms'

const Demo = ({ todoList, todo }) => {
  return (
    <div className='demo-template'>
      <TodoList todoList={todoList} />
      <TodoDetail todo={todo} />
    </div>
  )
}

export default Demo
