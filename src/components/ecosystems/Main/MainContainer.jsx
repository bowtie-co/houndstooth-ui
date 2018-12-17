// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import Main from './Main'
import { Loading } from 'atoms'
import { api, notifier } from 'lib'

// conditional functions here:
const loadingConditionFn = ({ isMainLoading, repoList }) => isMainLoading || repoList.length <= 0

export const enhance = compose(
  withStateHandlers(({ queryParams, match: { params: { username, repo } } }) => ({
    baseRoute: `repos/${username}/${repo}`,
    collections: null,
    orgList: [],
    repoList: [],
    repo: {},
    isMainLoading: false,
    pages: {},
    pageNumber: 1
  }), {
    setBaseRoute: ({ baseRoute }) => (payload) => ({ baseRoute: payload }),
    setCollections: ({ collections }) => (payload) => ({ collections: payload }),
    setOrgList: ({ orgList }) => (payload) => ({ orgList: payload }),
    setRepoList: ({ repoList }) => (payload) => ({ repoList: payload }),
    setRepo: ({ repo }) => (payload) => ({ repo: payload }),
    setPages: ({ pages }) => (payload) => ({ pages: payload }),
    setPageNumber: ({ pageNumber }) => (payload) => {
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
          setRepoList(data.repos)
          setMainLoading(false)
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(['pageNumber'], ({ getRepos }) => {
    getRepos()
  }),
  withPropsOnChange(['match'], ({ match, setBaseRoute, setCollections, setOrgList }) => {
    const { repo, username } = match.params
    !repo && setCollections(null)
    setBaseRoute(`repos/${username}/${repo}`)

    api.get(`orgs?per_page=100`)
      .then(({ data }) => {
        setOrgList(data.orgs)
      })
      .catch(notifier.bad.bind(notifier))
  }),
  withEither(loadingConditionFn, Loading)
)

export default enhance(Main)
