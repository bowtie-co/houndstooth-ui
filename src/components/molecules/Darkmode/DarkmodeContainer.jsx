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
        a.nav-link:hover, a.nav-link.active, a.link, .side-menu-section .nav-link:hover, .side-menu-section .nav-link.active { color: #00caff !important; }
        li.active.pointer.nav-item { color: #00caff; border-left: 3px #00caff solid !important;}
        i#Tooltip-delete-item-icon { color: #00caff !important;}
        div.Select-option.is-focused {background-color:  rgba(0,202,252,0.25) !important;}
        div.Select-option.is-selected {background-color: rgba(0,202,252,0.4) !important;}
        .Select-control:active {border-color: #00caff !important; box-shadow: 0 0 0 0.2rem rgba(0,202,252,0.25) !important;}
        input.field-group .form-control:focus, .field-group .form-control:active { border-color: #00caff !important;}
        .field-group .form-control:focus { border-color: #00caff !important; box-shadow: 0 0 0 0.2rem rgba(0,202,252,0.25)}
        .avatar, video, button, .body-template img, .file-editor { filter: invert(100%);}
        .loader {background-color: black; filter: invert(100%);}
        .file-tree-map-section a.not-active { color: #aeb3b8 !important;}
        a.link.bold.parent-link { color: #000 !important;}
      `
      }
    }
  }),
  withMaybe(({ isSupported }) => isSupported)
)(Darkmode)
