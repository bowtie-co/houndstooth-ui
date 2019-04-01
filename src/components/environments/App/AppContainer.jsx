// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import App from './App'
import { withRouter } from 'react-router'
import { compose, withStateHandlers, withHandlers, withPropsOnChange, lifecycle } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Loading } from 'atoms'
import { withQueryParams, withBaseRoutes } from 'helpers'
import { notifier, storage, github } from 'lib'

// conditional functions here:
const loadingConditionFn = ({ isMainLoading, repoList }) => isMainLoading || repoList.length <= 0

export const enhance = compose(
  withRouter,
  withQueryParams,
  withBaseRoutes,
  withStateHandlers(() => ({
    collections: null,
    orgList: [],
    repoList: [],
    isMainLoading: false,
    pages: {},
    pageNumber: 1
  }), {
    setCollections: ({ collections }) => (payload) => ({ collections: payload }),
    setOrgList: ({ orgList }) => (payload) => ({ orgList: payload }),
    setRepoList: ({ repoList }) => (payload) => ({ repoList: payload }),
    setPages: ({ pages }) => (payload) => ({ pages: payload }),
    setPageNumber: ({ pageNumber }) => (payload = {}) => {
      if (payload !== null) {
        const { next, prev } = payload
        if (next) {
          return { pageNumber: parseInt(next['page']) - 1 }
        } else if (prev) {
          return { pageNumber: parseInt(prev['page']) + 1 }
        } else {
          return { pageNumber: parseInt(payload) }
        }
      } else {
        return { pageNumber: 1 }
      }
    },
    setMainLoading: ({ isMainLoading }) => (payload) => ({ isMainLoading: payload })
  }),

  withHandlers({
    getRepos: ({ pageNumber, setMainLoading, setRepoList, setPages, setPageNumber }) => () => {
      setMainLoading(true)

      github.repos({ page: pageNumber, sort: 'updated' })
        .then(data => {
          setPages(data['pages'])
          setPageNumber(data['pages'])
          setRepoList(data['repos'])

          const repos = storage.get('repos') || {}
          const newRepos = Object.assign(repos, { [`page_${pageNumber || 1}`]: data })

          storage.set(`repos`, newRepos)

          setMainLoading(false)
        })
        .catch((resp) => {
          setMainLoading(false)
          notifier.bad(resp)
        })
    },
    getCurrentUser: ({ setCurrentUser }) => () => {
      github.user()
        .then(({ user }) => {
          setCurrentUser(user)
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withHandlers({
    reloadReposAndBranches: ({ getRepos }) => () => {
      ['all_repos', 'repos', 'branches', 'tree'].forEach(key => storage.remove(key))
      getRepos()
    },
    githubError: ({ history }) => (err) => {
      console.error('GITHUB ERROR!', err, typeof err)

      if (err.status === 401) {
        if (err.message) {
          notifier.error(err.message)
        }

        history.push('/logout')
      }
    }
  }),
  withPropsOnChange(['pageNumber'], ({ getRepos, pageNumber, setRepoList, setPages, setPageNumber }) => {
    const cachedRepoList = storage.get(`repos`) ? storage.get(`repos`)[`page_${pageNumber}`] : null

    if (!cachedRepoList || cachedRepoList.length <= 0) {
      getRepos()
    } else {
      setRepoList(cachedRepoList['repos'])
      setPages(cachedRepoList['pages'])
      setPageNumber(cachedRepoList['pages'])
    }
  }),
  withPropsOnChange(['location'], ({ location }) => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', process.env.REACT_APP_GA_TRACKING, { 'page_path': location.pathname })
    }
  }),

  lifecycle({
    componentWillMount () {
      const { githubError } = this.props

      github.on('err', githubError)
    },
    componentWillUnmount () {
      const { githubError } = this.props

      github.off('err', githubError)
    }
  }),
  withEither(loadingConditionFn, Loading)
)

export default enhance(App)
