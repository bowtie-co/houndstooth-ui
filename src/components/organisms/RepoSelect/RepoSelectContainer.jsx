
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { api, notifier, storage } from 'lib'

import RepoSelect from './RepoSelect'

export default compose(
  withStateHandlers({
    loadingRepos: false,
    asyncRepoList: []
  }, {
    setLoadingRepos: () => (payload) => ({ loadingRepos: payload }),
    setAsyncRepoList: () => (payload) => ({ asyncRepoList: payload })
  }),
  lifecycle({
    componentWillMount () {
      const { setAsyncRepoList, setLoadingRepos } = this.props
      if (storage.get('all_repos')) {
        setAsyncRepoList(storage.get('all_repos'))
      } else {
        setLoadingRepos(true)
        api.get(`repos?per_page=0`)
          .then(resp => {
            // setting a default value to data.repos in case it is undefined
            const {
              data: {
                repos = {}
              }
            } = resp

            setLoadingRepos(false)
            storage.set('all_repos', repos)
            setAsyncRepoList(repos)
          })
          .catch((resp) => {
            notifier.bad(resp)
            setLoadingRepos(false)
          })
      }
    }
  })
)(RepoSelect)
