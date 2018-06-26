// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import Repo from './Repo'
import { Loading } from '../../atoms'
import api from '../../../lib/api'
// import notifier from '../../../lib/notifier'

// conditional functions here:
const loadingConditionFn = ({ isComponentLoading }) => isComponentLoading

const todoList = [
  { id: 1, title: 'title 1', content: 'content 1', favorite: true },
  { id: 2, title: 'title 2', content: 'content 2', favorite: false },
  { id: 3, title: 'title 3', content: 'content 3', favorite: false }
]

// const methods = {
//   create: 'post',
//   edit: 'put',
//   view: 'get'
// }

export const enhance = compose(
  withState('todoList', 'setTodoList', todoList),
  withState('todo', 'setTodo', {}),
  withState('isComponentLoading', 'setIsComponentLoading', false),
  withEither(loadingConditionFn, Loading),
  lifecycle({
    componentWillMount () {
      api.get('repos?sort=updated&per_page=12&affiliation=owner')
    }
  }),
  withHandlers({
    formSubmit: ({ match, isComponentLoading, history }) => (formData) => {
      console.log('formData', formData)
      // history.goBack()
      // const { action, modelName, modelId } = match.params

      // const method = methods[action]
      // const route = modelId ? `${modelName}/${modelId}` : `${modelName}`
      // isComponentLoading(true)

      // api[method](route, { [modelName]: formData })
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

export default enhance(Repo)
