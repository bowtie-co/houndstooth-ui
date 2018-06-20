import React from 'react'

const TodoDetail = ({ todo }) => {
  return (
    <section className='todo-detail-section' >
      <p>{todo.title}</p>
      <p>{todo.content}</p>
    </section>
  )
}

export default TodoDetail
