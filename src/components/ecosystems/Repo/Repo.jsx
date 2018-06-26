import React from 'react'
import { Todo } from '../../models'
import { PublicRoute, Switch } from '../../atoms'

const Repo = ({ todoList, todo, setTodo, formSubmit, modelName }) => {
  return (
    <div className='demo-template'>
      <PublicRoute
        props={{ todoList, setTodo }}
        path={'/(view|edit|create)/todos'}
        component={Todo.List}
      />
      <Switch>
        <PublicRoute
          props={{ todo }}
          path={'/view/todos/:modelId'}
          component={Todo.Single}
        />
        <PublicRoute
          props={{ todo, formSubmit, modelName }}
          path={'/edit/todos/:modelId'}
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

export default Repo
