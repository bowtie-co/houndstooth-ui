
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { api, notifier } from 'lib'

import RepoSelect from './RepoSelect'

export default compose(
  withStateHandlers({
    activeRepo: ''
  }, {
    setActiveRepo: () => (payload) => ({ activeRepo: payload })
  }),
  withHandlers({
    asyncLoadRepos: () => (search) => {
      return api.get(`repos`)
        .then(({ data }) => {
          return {
            options: data['repos']
          }
        })
        .catch((resp) => {
          notifier.bad(resp)
        })
    }
  })
)(RepoSelect)
