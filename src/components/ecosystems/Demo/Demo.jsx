import React from 'react'
import {
  TodoList,
  TodoDetail
} from '../../organisms'
import { PublicRoute } from '../../atoms'

const Demo = ({ todoList, todo, setTodo }) => {
  return (
    <div className='demo-template'>
      <PublicRoute
        props={{ todoList, setTodo }}
        path={'/todos'}
        component={TodoList}
      />
      <PublicRoute
        props={{ todo }}
        path={'/todos/(:id)?'}
        component={TodoDetail}
      />
    </div>
  )
}

export default Demo
