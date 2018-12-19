// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import Main from './Main'
import { Loading } from 'atoms'
import { api, notifier, storage } from 'lib'

// conditional functions here:
const loadingConditionFn = ({ isMainLoading, repoList }) => isMainLoading || repoList.length <= 0

export const enhance = compose(
  withStateHandlers(({ queryParams }) => ({
    collections: null,
    orgList: [],
    repoList: [],
    repo: {},
    isMainLoading: false,
    pages: {},
    pageNumber: 1
  }), {
    setCollections: ({ collections }) => (payload) => ({ collections: payload }),
    setOrgList: ({ orgList }) => (payload) => ({ orgList: payload }),
    setRepoList: ({ repoList }) => (payload) => ({ repoList: payload }),
    setRepo: ({ repo }) => (payload) => ({ repo: payload }),
    setPages: ({ pages }) => (payload) => ({ pages: payload }),
    setPageNumber: ({ pageNumber }) => (payload = {}) => {
      const { next, prev } = payload
      if (next) {
        return { pageNumber: parseInt(next['page'], 10) - 1 }
      } else if (prev) {
        return { pageNumber: parseInt(prev['page'], 10) + 1 }
      } else {
        return { pageNumber: parseInt(payload, 10) }
      }
    },
    setStagedFiles: ({ stagedFiles }) => (payload) => ({ stagedFiles: payload }),
    setMainLoading: ({ isMainLoading }) => (payload) => ({ isMainLoading: payload })
  }),
  withHandlers({
    getRepos: ({ pageNumber, setMainLoading, setRepoList, setPages, setPageNumber }) => () => {
      setMainLoading(true)
      api.get(`repos?page=${pageNumber}&sort=updated`)
        .then(({ data }) => {
          setPages(data['pages'])
          setPageNumber(data['pages'])
          setRepoList(data['repos'])

          const repos = storage.get('repos') || {}
          const newRepos = Object.assign(repos, { [`page_${pageNumber || 1}`]: data })

          storage.set(`repos`, newRepos)

          setMainLoading(false)
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withHandlers({
    reloadRepos: ({ getRepos }) => () => {
      storage.remove('repos')
      getRepos()
    }
  }),
  withPropsOnChange(['pageNumber'], ({ getRepos, setRepoList, setPages, setPageNumber, pageNumber }) => {
    const cachedRepoList = storage.get(`repos`) ? storage.get(`repos`)[`page_${pageNumber}`] : null

    if (!cachedRepoList || cachedRepoList.length <= 0) {
      getRepos()
    } else {
      setRepoList(cachedRepoList['repos'])
      setPages(cachedRepoList['pages'])
      setPageNumber(cachedRepoList['pages'])
    }
  }),
  withPropsOnChange(['match'], ({ match, setCollections, setOrgList }) => {
    const { repo } = match.params
    !repo && setCollections(null)

    api.get(`orgs?per_page=100`)
      .then(({ data }) => {
        setOrgList(data.orgs)
      })
      .catch(notifier.bad.bind(notifier))
  }),
  withPropsOnChange(['match'], ({ match: { params: { username, repo } } }) => ({
    baseRoute: `repos/${username}/${repo}`
  })),
  withEither(loadingConditionFn, Loading)
)

export default enhance(Main)
