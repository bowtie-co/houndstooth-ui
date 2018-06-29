// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withHandlers, withPropsOnChange, lifecycle } from 'recompose'
import Repo from './Repo'
import qs from 'qs'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

// conditional functions here:

export const enhance = compose(
  // withPropsOnChange(
  //   ({ location }, { location: nextLocation }) => nextLocation.search !== location.search,
  //   ({ location }) => ({ queryParams: qs.parse(location.search, { ignoreQueryPrefix: true }) })
  // ),
  withStateHandlers(({ location, queryParams }) => ({
    dirList: [],
    file: {},
    branchList: [],
    branch: queryParams['ref'] || 'master',
    isComponentLoading: false
  }), {
    setDirList: ({ dirList }) => (payload) => ({ dirList: payload }),
    setFile: ({ file }) => (payload) => ({ file: payload }),
    setBranchList: ({ branchList }) => (payload) => ({ branchList: payload }),
    setBranch: ({ branch }, { history }) => (payload) => ({ branch: payload })
  }),
  withHandlers({
    changeBranch: ({ history }) => (e) => {
      history.push(`?ref=${e.target.value}`)
    }
  }),
  lifecycle({
    componentWillMount () {
      const { match, setBranchList } = this.props
      const { username, repo } = match.params

      api.get(`repos/${username}/${repo}/branches`)
        .then(({ data }) => setBranchList(data.branches))
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange([ 'queryParams' ], ({ match, queryParams, setDirList, setFile, setBranch }) => {
    setBranch(queryParams['ref'] || 'master')

    const stringifiedParams = qs.stringify(queryParams)

    const { repo, username } = match.params
    const route = `repos/${username}/${repo}/files?${stringifiedParams}`

    api.get(route)
      .then(({ data }) => {
        if (data['files']) {
          // sorts the directory to include folders before files.
          data['files'].sort(a => a.type === 'file' ? 1 : -1)
          setDirList(data['files'])
        } else if (data['file']) {
          setFile(data['file'])
        }
      })
      .catch(notifier.bad.bind(notifier))
  })
)

export default enhance(Repo)
