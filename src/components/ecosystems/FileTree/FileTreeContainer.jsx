// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withPropsOnChange, lifecycle } from 'recompose'
import FileTree from './FileTree'
import qs from 'qs'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

// conditional functions here:

export const enhance = compose(
  withStateHandlers(({ location }) => ({
    dirList: [],
    file: {},
    branchList: [],
    branch: 'master',
    isComponentLoading: false,
    paramsObj: qs.parse(location.search, { ignoreQueryPrefix: true })
  }), {
    setDirList: ({ dirList }) => (payload) => ({ dirList: payload }),
    setFile: ({ file }) => (payload) => ({ file: payload }),
    setBranchList: ({ branchList }) => (payload) => ({ branchList: payload }),
    setBranch: ({ branch }, { history }) => (payload) => {
      history.push(`?branch=${payload}`)
      return { branch: payload }
    },
    setParamsObj: ({ paramsObj }) => (payload) => ({ paramsObj: payload }),
  }),
  lifecycle({
    componentWillMount(){
      const { match, setBranchList } = this.props
      const { model, username, repo } = match.params

      api.get(`repos/${username}/${repo}/branches`)
        .then(({ data }) => setBranchList(data.branches))
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(
    ({ location }, { location: nextLocation }) => nextLocation.search !== location.search,
    ({ location, match, setParamsObj, setDirList, setFile }) => {
      const newParamsObj = qs.parse(location.search, { ignoreQueryPrefix: true })
      const stringifiedParams = qs.stringify(newParamsObj)
      setParamsObj(newParamsObj)

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
    }
  )
)

export default enhance(FileTree)
