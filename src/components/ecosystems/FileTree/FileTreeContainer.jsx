// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withState, withHandlers, lifecycle, withPropsOnChange } from 'recompose'
import { buildUrlParamObj } from '@bowtie/utils'
import FileTree from './FileTree'
import qs from 'qs'
import { Loading } from '../../atoms'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

// conditional functions here:
const loadingConditionFn = ({ isComponentLoading }) => isComponentLoading

export const enhance = compose(
  withState('isComponentLoading', 'setIsComponentLoading', false),
  withState('dirList', 'setDirList', []),
  withState('file', 'setFile', {}),
  withState('paramsObj', 'setParamsObj', ({ location }) => qs.parse(location.search, { ignoreQueryPrefix: true })),
  lifecycle({
    componentWillMount () {
      const { match, location, paramsObj, setDirList, setFile } = this.props
      const { repo, username } = match.params
      const stringifiedParams = qs.stringify(paramsObj)
      const route = `repos/${username}/${repo}/files?${stringifiedParams}`
      console.log('route', route)
      api.get(route)
        .then(({ data }) => data['files'] ? setDirList(data['files']) : setFile(data['file']))

      //   const { path, branch } = params
      //   const queryParams = `path=${path || ''}&ref=${branch || 'master'}`
      //   const requestPath = `${baseRoute}/files?${queryParams}`
      //   return (dispatch, getState, api) => {
      //     dispatch(_loading(true))
      //     api.get(requestPath)
      //       .then(resp => resp.json())
      //       .then(data => {
      //         if (data.files) {
      //           // sorts the directory to include folders before files.
      //           data.files.sort((a, b) => {
      //             return a.name.includes(".") ? 1 : -1
      //           })

      //           dispatch(_saveActiveDir(data.files))
      //           dispatch(_loading(false))
      //         } else if (data.file) {
      //           dispatch(_saveActiveFile(data.file))
      //           dispatch(_loading(false))
      //         }
      //         next()
      //       })
      //       .catch(next);
      //   };
      // };,
    }
  })
  // withPropsOnChange(['location'], ({ location }, { location: nextLocation }) => {
  //   if(nextLocation.search !== location.search){
  //     console.log("a new search param", nextLocation.search);
  //   }
  // })
)

export default enhance(FileTree)
