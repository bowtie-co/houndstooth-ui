// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withState, lifecycle } from 'recompose'
import FileTree from './FileTree'
import qs from 'qs'
import api from '../../../lib/api'
// import notifier from '../../../lib/notifier'

// conditional functions here:

export const enhance = compose(
  withState('isComponentLoading', 'setIsComponentLoading', false),
  withState('dirList', 'setDirList', []),
  withState('file', 'setFile', {}),
  withState('paramsObj', 'setParamsObj', ({ location }) => qs.parse(location.search, { ignoreQueryPrefix: true })),
  lifecycle({
    componentWillMount () {
      const { match, paramsObj, setDirList, setFile } = this.props
      const { repo, username } = match.params
      const stringifiedParams = qs.stringify(paramsObj)
      const route = `repos/${username}/${repo}/files?${stringifiedParams}`
      console.log('route', route)
      api.get(route)
        .then(({ data }) => {
          if (data['files']) {
            // sorts the directory to include folders before files.
            data['files'].sort((a, b) => {
              return a.name.includes('.') ? 1 : -1
            })
            setDirList(data['files'])
          } else if (data['file']) {
            setFile(data['file'])
          }
        })
    }
  })
  // withPropsOnChange(['location'], ({ location }, { location: nextLocation }) => {
  //   if(nextLocation.search !== location.search){
  //     console.log("a new search param", nextLocation.search);
  //   }
  // })
)

export default enhance(FileTree)
