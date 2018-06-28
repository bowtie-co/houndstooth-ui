// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withState, withPropsOnChange } from 'recompose'
import FileTree from './FileTree'
import qs from 'qs'
import api from '../../../lib/api'
// import notifier from '../../../lib/notifier'

// conditional functions here:

export const enhance = compose(
  withState('isComponentLoading', 'setIsComponentLoading', false),
  withState('dirList', 'setDirList', []),
  withState('file', 'setFile', {}),
  // withState('branch', 'setBranch', 'master'),
  withState('paramsObj', 'setParamsObj', ({ location }) => qs.parse(location.search, { ignoreQueryPrefix: true })),
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
    }
  )
)

export default enhance(FileTree)
