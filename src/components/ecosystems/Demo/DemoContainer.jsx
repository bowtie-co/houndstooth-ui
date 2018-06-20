// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withProps, withState } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import withForm from '../../../helpers/withForm'
import Demo from './Demo'
import { Loading } from '../../atoms'

// conditional functions here:
const nullConditionFn = (props) => !props
const loadingConditionFn = (props) => props.isLoading

const todoList = [
  { id: 1, title: 'title 1', content: 'content 1', favorite: true },
  { id: 2, title: 'title 2', content: 'content 2', favorite: false },
  { id: 3, title: 'title 3', content: 'content 3', favorite: false }
]

export const enhance = compose(
  withForm,
  withState('todoList', 'setTodoList', []),
  withState('todo', 'setTodo', {}),
  withMaybe(nullConditionFn),
  withEither(loadingConditionFn, Loading),
  withProps((props) => {
    return { todoList }
  })
)

export default enhance(Demo)
