import storage from '../../../lib/storage'
import Darkmode from './Darkmode'
import { compose, withStateHandlers, withPropsOnChange, withHandlers, lifecycle, pure} from 'recompose';

export default compose(
  pure,
  withStateHandlers(
    {
      isActive: false,
      isSupported: null
    },
    {
      toggle: ({isActive}) => (value) => ({
        isActive: value
      })
    }
  ),
  withHandlers({
    isSupported: () => (property = 'filter', value = 'invert(100%)') => {
      let prop = property + ':',
      el = document.createElement('test'),
      mStyle = el.style
      el.style.cssText = prop + value
      return mStyle[property]
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.toggle(storage.get('DarkMode') || false) //TODO
      console.log('mounted', storage.get('DarkMode'))
    },
    componentDidUpdate() {
      storage.set('DarkMode', this.props.isActive)
      console.log('update', storage.get('DarkMode'))
    }
  }),
  withPropsOnChange([ 'isSupported' ], ({ isSupported }) => {
    if(isSupported) {
      return {
      cssStyles: `
      .content-wrapper { filter: invert(100%); background: #fefefe; transition: all 0.5s ease;}
      .avatar, video, button, .body-template img, .file-editor { filter: invert(100%); transition: all 0.05s ease;}
      `
      }
    } else {
      return;
    }
  })
)(Darkmode)