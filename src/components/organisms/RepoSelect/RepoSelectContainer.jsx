
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { api, notifier, storage } from 'lib'

import RepoSelect from './RepoSelect'

export default compose(
  withStateHandlers({
    loadingRepos: true,
    asyncRepoList: []
  }, {
    setLoadingRepos: () => (payload) => ({ loadingRepos: payload }),
    setAsyncRepoList: () => (payload) => ({ asyncRepoList: payload })
  }),
  lifecycle({
    async componentWillMount () {
      const { setAsyncRepoList, setLoadingRepos } = this.props
      setLoadingRepos(true)

      if (storage.get('all_repos')) {
        setAsyncRepoList(storage.get('all_repos'))
      } else {
        const { data } = await api.get(`repos?per_page=0`)
          .then(resp => resp || { data: { repos: {} } })
          .catch((resp) => { notifier.bad(resp) })

        storage.set('all_repos', data['repos'])
        setAsyncRepoList(data['repos'])
      }
      setLoadingRepos(false)
    }
  })
)(RepoSelect)
