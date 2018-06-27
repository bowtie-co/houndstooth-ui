// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withState, withHandlers, lifecycle, withPropsOnChange } from 'recompose'
import { buildUrlParamObj } from '@bowtie/utils'
import FileTree from './FileTree'
import { Loading } from '../../atoms'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

// conditional functions here:

export const enhance = compose(
  withState('dir', 'setDir', {}),
  withState('file', 'setFile', {}),
  withState('path', 'setPath', '')
  lifecycle({
    componentWillMount () {
      const { repo, username } = this.props.match.params

      const route = `repos/${username}/${repo}/files?path=vendor/removeMe&ref=master`

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
      // };
    }
  }),
  withPropsOnChange(['location'], ({ location }, { location: nextLocation }) => {
    if(nextLocation.search !== location.search){
      console.log("a new search param", nextLocation.search);
    }
  })
)

export default enhance(FileTree)
