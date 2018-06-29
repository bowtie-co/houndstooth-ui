// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, lifecycle, withStateHandlers } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import Main from './Main'
import { Loading } from '../../atoms'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

// conditional functions here:
const loadingConditionFn = ({ isComponentLoading }) => isComponentLoading

// const methods = {
//   create: 'post',
//   edit: 'put',
//   view: 'get'
// }

export const enhance = compose(
  withStateHandlers({
    repoList: [],
    repo: {},
    isComponentLoading: false
  }, {
    setRepoList: ({ repoList }) => (payload) => ({ repoList: payload }),
    setRepo: ({ repo }) => (payload) => ({ repo: payload })
  }),
  withEither(loadingConditionFn, Loading),
  lifecycle({
    componentWillMount () {
      console.log('COMPONENT WILL MOUNT REPO')

      const { setRepoList, match } = this.props
      const { model } = match.params
      api.get(`${model}?sort=updated&per_page=12&affiliation=owner`)
        .then(({ data }) => setRepoList(data.repos))
        .catch(notifier.bad.bind(notifier))
    }
  })
  // withHandlers({
  //   formSubmit: ({ match, isComponentLoading, history }) => (formData) => {
  //     console.log('formData', formData)
  //     // history.goBack()
  //     // const { action, modelName, modelId } = match.params

  //     // const method = methods[action]
  //     // const route = modelId ? `${modelName}/${modelId}` : `${modelName}`
  //     // isComponentLoading(true)

  //     // api[method](route, { [modelName]: formData })
  //     //   .then(notifier.ok.bind(notifier))
  //     //   .then(({ data }) => {
  //     //     isComponentLoading(false)
  //     //   })
  //     //   .catch(resp => {
  //     //     notifier.apiErrors(resp, handleErrors)
  //     //     isComponentLoading(false)
  //     //   })
  //   },
  //   delete: () => () => {

  //   }
  // })

)

export default enhance(Main)
