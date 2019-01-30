import { withRouter } from 'react-router'
import { compose, withProps, shouldUpdate, onlyUpdateForKeys } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import FileTreeMap from './FileTreeMap'

const nullConditionalFn = ({ tree }) => Object.keys(tree).length === 0

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
  onlyUpdateForKeys(['tree', 'match']),
  withMaybe(nullConditionalFn),
  shouldUpdate((props, { match: nextMatch }) => nextMatch.params['type'] !== 'file')
)(FileTreeMap)
