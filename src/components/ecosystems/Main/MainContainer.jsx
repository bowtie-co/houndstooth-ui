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

export const enhance = compose(
  withStateHandlers(({ queryParams }) => ({
    repoList: [],
    repo: {},
    collections: [],
    stagedFiles: [],
    branchList: [],
    branch: queryParams['ref'] || 'master',
    isComponentLoading: false
  }), {
    setRepoList: ({ repoList }) => (payload) => ({ repoList: payload }),
    setRepo: ({ repo }) => (payload) => ({ repo: payload }),
    setCollections: ({ collections }) => (payload) => ({ collections: payload }),
    setStagedFiles: ({ stagedFiles }) => (payload) => ({ stagedFiles: payload }),
    setBranchList: ({ branchList }) => (payload) => ({ branchList: payload }),
    setBranch: ({ branch }) => (payload) => ({ branch: payload })
  }),
  withEither(loadingConditionFn, Loading),
  lifecycle({
    componentWillMount () {
      const { setRepoList, match } = this.props
      const { model } = match.params
      api.get(`${model}?sort=updated`)
        .then(({ data }) => setRepoList(data.repos))
        .catch(notifier.bad.bind(notifier))
    }
  })
)

export default enhance(Main)
