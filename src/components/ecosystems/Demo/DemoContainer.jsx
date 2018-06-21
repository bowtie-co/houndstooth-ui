// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withProps, withState, withHandlers } from 'recompose'
import { withEither } from '@bowtie/react-utils'
// import withForm from '../../../helpers/withForm'
import Demo from './Demo'
import { Loading } from '../../atoms'
// import api from '../../../lib/api'
// import notifier from '../../../lib/notifier'

// conditional functions here:
const loadingConditionFn = ({ isComponentLoading }) => isComponentLoading

const todoList = [
  { id: 1, title: 'title 1', content: 'content 1', favorite: true },
  { id: 2, title: 'title 2', content: 'content 2', favorite: false },
  { id: 3, title: 'title 3', content: 'content 3', favorite: false }
]

const methods = {
  create: 'post',
  edit: 'put',
  view: 'get'
}


export const enhance = compose(
  // withForm,
  withState('todoList', 'setTodoList', []),
  withState('todo', 'setTodo', {}),
  withState('isComponentLoading', 'setIsComponentLoading', false),
  withEither(loadingConditionFn, Loading),
  withProps((props) => {
    return { todoList }
  }),
  withHandlers({
    formSubmit: ({ match, isComponentLoading }) => (formData) => {
      const { action, model_name, model_id } = match.params



      const method = methods[action]
      const route = model_id ? `${model_name}/${model_id}` : `${model_name}`
      // isComponentLoading(true)

      // api[method](route, { [model_name]: formData })
      //   .then(notifier.ok.bind(notifier))
      //   .then(({ data }) => {
      //     isComponentLoading(false)
      //   })
      //   .catch(resp => {
      //     notifier.apiErrors(resp, handleErrors)
      //     isComponentLoading(false)
      //   })
    },
    delete: () => () => {

    }
  })

)

export default enhance(Demo)


