import { storage } from 'lib'
import Darkmode from './Darkmode'
import { compose, withStateHandlers, withPropsOnChange, withProps } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import { withFormatting } from 'helpers'

export default compose(
  withFormatting,
  withStateHandlers({
    isActive: storage.get('DarkMode') || false
  }, {
    toggleActive: ({ isActive }) => () => ({ isActive: !isActive })
  }),
  withProps(({checkBrowserCSSSupport}) => () => ({
    isSupported: checkBrowserCSSSupport('filter', 'invert(100%)')
  })),
  withPropsOnChange([ 'isActive' ], ({ isActive }) => {
    storage.set('DarkMode', isActive)
    if (isActive) {
      return {
        cssStyles: `
        .content-wrapper { filter: invert(90%) contrast(120%) brightness(135%);}
        li.page-item { filter: invert(90%)}
        .avatar, video, button, .body-template img, .file-editor { filter: invert(100%);}
        .loader {background-color: black; filter: invert(100%);}
      `
      }
    }
  }),
  withMaybe(({ isSupported }) => isSupported)
)(Darkmode)
