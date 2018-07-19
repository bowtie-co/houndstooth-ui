// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, lifecycle, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
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
    isMainLoading: false,
    pageCount: 0,
  }), {
    setRepoList: ({ repoList }) => (payload) => ({ repoList: payload }),
    setRepo: ({ repo }) => (payload) => ({ repo: payload }),
    nextPage: ({ pageCount }) => () => ({ pageCount: pageCount + 1 }),
    previousPage: ({ pageCount }) => () => ({ pageCount: pageCount - 1 }),
    setCollections: ({ collections }) => (payload) => ({ collections: payload }),
    setStagedFiles: ({ stagedFiles }) => (payload) => ({ stagedFiles: payload }),
    setBranchList: ({ branchList }) => (payload) => ({ branchList: payload }),
    setBranch: ({ branch }) => (payload) => ({ branch: payload }),
    setMainLoading: ({ isMainLoading }) => (payload) => ({ isMainLoading: payload })
  }),
  withHandlers({
    getRepos: ({ pageCount, setMainLoading, setRepoList }) => () => {
      setMainLoading(true)
      api.get(`repos?page=${pageCount}&sort=updated`)
        .then(({ data }) => {
          setRepoList(data.repos)
          setMainLoading(false)
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(['pageCount'], ({ pageCount, getRepos }) => {
    getRepos()
  }),
  withEither(loadingConditionFn, Loading)
)

export default enhance(Main)
