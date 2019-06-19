
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
              const flattenedRepos = []
              for (let i=0; i<repos.length; i++) {
                flattenedRepos.push(Object.assign({}, {'default_branch': repos[i]['default_branch'], 'full_name': repos[i]['full_name']}))
              }
              storage.set('all_repos', flattenedRepos)
              setAsyncRepoList(flattenedRepos)
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
