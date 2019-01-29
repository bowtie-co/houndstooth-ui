
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { api, notifier } from 'lib'

import RepoSelect from './RepoSelect'

export default compose(
  withStateHandlers({
    activeRepo: '',
    loadingRepos: true,
    repoList: []
  }, {
    setActiveRepo: () => (payload) => ({ activeRepo: payload }),
    setLoadingRepos: () => (payload) => ({ loadingRepos: payload }),
    setRepoList: () => (payload) => ({ repoList: payload })
  }),
  lifecycle({
    async componentWillMount () {
      const { setRepoList, setLoadingRepos } = this.props
      setLoadingRepos(true)
      
      const { data } = await api.get(`repos?per_page=100`).catch((resp) => { notifier.bad(resp) })
      setRepoList(data.repos)
      setLoadingRepos(false)
    }
  })
)(RepoSelect)
