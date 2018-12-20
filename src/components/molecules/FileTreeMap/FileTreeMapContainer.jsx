
import { withRouter } from 'react-router'
import { compose, withProps, shouldUpdate, onlyUpdateForKeys } from 'recompose'
import FileTreeMap from './FileTreeMap'

export default compose(
  withRouter,
  withProps({
    fileIcons: {
      css: 'fab fa-css3',
      scss: 'fab fa-sass',
      html: 'fas fa-code',
      js: 'fab fa-js',
      json: 'far fa-file-alt',
      file: 'far fa-file-alt',
      dir: 'fas fa-folder'
    }
  }),
  onlyUpdateForKeys(['dirList']),
  shouldUpdate((props, { match: nextMatch }) => nextMatch.params['type'] !== 'file')
)(FileTreeMap)
