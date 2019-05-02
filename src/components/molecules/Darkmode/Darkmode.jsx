import React from 'react'
import storage from '../../../lib/storage'
import { Icon } from 'atoms'
import { compose, withStateHandlers, withProps, branch, withState, withHandlers, lifecycle} from 'recompose';

// class Darkmode extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       active: false
//     }

    // this.css = `
    // .content-wrapper { filter: invert(100%); background: #fefefe; transition: all 0.5s ease;}
    // .avatar, video, button, .body-template img, .file-editor { filter: invert(100%); transition: all 0.05s ease;}
    // `;
//   }

//   isActive = () => this.state.active

//   toggle = () => {
//     this.setState({
//       active: !this.isActive()
//     })
//   }
  
  // filterSupported = (property = 'filter', value = 'invert(100%)') => {
  //   let prop = property + ':',
  //   el = document.createElement('test'),
  //   mStyle = el.style
  //   el.style.cssText = prop + value
  //   return mStyle[property]
  // }

//   componentDidMount() {
//       this.setState({
//         active: storage.get('DarkMode') || false
//       })
//   }

//   componentDidUpdate() {
//       storage.set('DarkMode', this.state.active)
//   }

//   render() {
//     if(!this.filterSupported) {
//       return null
//     }

//     return (
//       <React.Fragment>
//         <Icon className='nav-darkmode fas fa-adjust' color='white' size='md' onClick={this.toggle} />
//         <style media={this.isActive() ? 'screen' : 'none'}>
//           {this.isActive() ? this.css.trim() : this.css}
//         </style>
//       </React.Fragment>
//     )
//   }
// }
// const enhance = compose(
//   withStateHandlers(
//     {
//       isActive: { value: false },
//       browserSupported: { value: null }
//     },
//     {
//       toggleActive: ({isActive}) => () => ({
//         isActive: !isActive
//       }),
//       browserSupportCheck: ({browserSupported}) => () => {
//         const filterCheck = (property = 'filter', value = 'invert(100%)') => {
//           let prop = property + ':',
//           el = document.createElement('test'),
//           mStyle = el.style
//           el.style.cssText = prop + value
//           return mStyle[property]
//         }
//         return {browserSupported: filterCheck()}
//       }
//     }
//   ),
//   withProps(() => ({
//     cssStyles: `
//     .content-wrapper { filter: invert(100%); background: #fefefe; transition: all 0.5s ease;}
//     .avatar, video, button, .body-template img, .file-editor { filter: invert(100%); transition: all 0.05s ease;}
//     `
//   })),
//   branch(
//     props => props.browserSupported === false,
//     null
//   )
// )
const enhance = compose(
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
  withProps(() => ({
    cssStyles: `
    .content-wrapper { filter: invert(100%); background: #fefefe; transition: all 0.5s ease;}
    .avatar, video, button, .body-template img, .file-editor { filter: invert(100%); transition: all 0.05s ease;}
    `
  })),
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
  })
)

const Darkmode = ({ isActive, toggle, cssStyles, isSupported }) => {
  if(!isSupported) {
    return null
  }

  return (
    <React.Fragment>
      <Icon className='nav-darkmode fas fa-adjust' color='white' size='md' onClick={() => toggle(!isActive)} />
      <style media={isActive ? 'screen' : 'none'}>
        {isActive ? cssStyles.trim() : cssStyles}
      </style>
    </React.Fragment>
  )
}


export default enhance(Darkmode);