import React from 'react'
import {
  Todo
} from '../../organisms'
import { PublicRoute, Switch } from '../../atoms'

const Demo = ({ todoList, todo, setTodo, formSubmit }) => {
  console.log('rendering Demo')
  return (
    <div className='demo-template'>
      <PublicRoute
        props={{ todoList, setTodo }}
        path={'/view/todos'}
        component={Todo.List}
      />
      <Switch>
        <PublicRoute
          props={{ todo }}
          path={'/view/todos/:model_id'}
          component={Todo.Single}
        />
        <PublicRoute
          props={{ todo, formSubmit }}
          path={'/edit/todos/:model_id'}
          component={Todo.Form}
        />
        <PublicRoute
          props={{ todo, formSubmit }}
          path={'/create/todos/'}
          component={Todo.Form}
        />
      </Switch>
    </div>
  )
}

export default Demo
