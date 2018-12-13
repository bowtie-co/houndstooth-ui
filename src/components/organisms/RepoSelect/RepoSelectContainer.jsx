
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
      return api.get(`repos?q=${search}`)
        .then(({ data }) => {
          return {
            options: data['repos']
          }
        })
        .catch(notifier.bad.bind(notifier))
    }
  })
)(RepoSelect)
