
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { notifier, storage, github } from 'lib'

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
      const { setAsyncRepoList, setLoadingRepos, buildSdkParams } = this.props
      if (storage.get('all_repos')) {
        setAsyncRepoList(storage.get('all_repos'))
      } else {
        setLoadingRepos(true)
        const params = buildSdkParams({ per_page: '0' })
        github.repos(params)
          .then(({ repos }) => {
            if (repos) {
              setLoadingRepos(false)
              storage.set('all_repos', repos)
              setAsyncRepoList(repos)
            }
          })
          .catch((resp) => {
            notifier.bad(resp)
            setLoadingRepos(false)
          })
      }
    }
  })
)(RepoSelect)
