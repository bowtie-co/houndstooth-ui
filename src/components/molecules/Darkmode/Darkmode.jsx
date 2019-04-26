import React from 'react'
import { Icon } from 'atoms'

class Darkmode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }

    this.css = `
    .content-wrapper { filter: invert(100%); background: #fefefe; }
    .avatar, video, button, .body-template img, .file-editor { filter: invert(100%); }
    `;

    this.store = typeof localStorage === 'undefined' ? null : localStorage;
  }

  isActive = () => this.state.active

  toggle = () => {
    this.setState({
      active: !this.isActive()
    })
  }
  
  filterSupported = (property = 'filter', value = 'invert(100%)') => {
    let prop = property + ':',
    el = document.createElement('test'),
    mStyle = el.style
    el.style.cssText = prop + value
    return mStyle[property]
  }

  componentDidMount() {
    if(this.store) {
      this.setState({
        active: this.store.getItem('DarkMode') || false
      })
    }
  }

  componentDidUpdate() {
    if(this.store) {
      this.store.setItem('DarkMode', this.state.active)
    }
  }

  render() {
    if(!this.filterSupported) {
      return null
    }

    return (
      <React.Fragment>
        <Icon className='nav-darkmode fas fa-adjust' color='white' size='md' onClick={this.toggle} />
        <style media={this.isActive() ? 'screen' : 'none'}>
          {this.isActive() ? this.css.trim() : this.css}
        </style>
      </React.Fragment>
    )
  }
}

export default Darkmode