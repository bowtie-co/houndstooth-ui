// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, lifecycle, withStateHandlers } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import Main from './Main'
import { Loading } from 'atoms'
import { api, notifier } from 'lib'

// conditional functions here:
const loadingConditionFn = ({ isMainLoading }) => isMainLoading

export const enhance = compose(
  withStateHandlers(({ queryParams }) => ({
    repoList: [],
    repo: {},
    isMainLoading: false
  }), {
    setRepoList: ({ repoList }) => (payload) => ({ repoList: payload }),
    setRepo: ({ repo }) => (payload) => ({ repo: payload }),
    setCollections: ({ collections }) => (payload) => ({ collections: payload }),
    setStagedFiles: ({ stagedFiles }) => (payload) => ({ stagedFiles: payload }),
    setBranchList: ({ branchList }) => (payload) => ({ branchList: payload }),
    setBranch: ({ branch }) => (payload) => ({ branch: payload }),
    setMainLoading: ({ isMainLoading }) => (payload) => ({ isMainLoading: payload })
  }),
  lifecycle({
    componentWillMount () {
      const { setRepoList, match, setMainLoading } = this.props
      const { model } = match.params
      setMainLoading(true)
      api.get(`${model}?sort=updated`)
        .then(({ data }) => {
          setRepoList(data.repos)
          setMainLoading(false)
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withEither(loadingConditionFn, Loading)
)

export default enhance(Main)
