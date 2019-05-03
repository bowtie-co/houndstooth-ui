import { storage } from 'lib'
import Darkmode from './Darkmode'
import { compose, withStateHandlers, withPropsOnChange, withProps } from 'recompose';
import { withMaybe } from '@bowtie/react-utils'
import { withFormatting } from 'helpers'

export default compose(
  withFormatting,
  withStateHandlers({
    isActive: storage.get('DarkMode') || false
  },{
    toggleActive: ({ isActive }) => () => ({ isActive: !isActive })
  }),
  withProps(({checkBrowserCSSSupport}) => () => ({
    isSupported: checkBrowserCSSSupport('filter', 'invert(100%)')
  })),
  withPropsOnChange([ 'isActive' ], ({ isActive }) => {
    storage.set('DarkMode', isActive)
    if(isActive) {
      return {
      cssStyles: `
      .content-wrapper { filter: invert(100%); background: #fefefe; transition: all 0.5s ease;}
      .avatar, video, button, .body-template img, .file-editor { filter: invert(100%); transition: all 0.05s ease;}
      `
      }
    }
  }),
  withMaybe(({ isSupported }) => isSupported)
)(Darkmode)