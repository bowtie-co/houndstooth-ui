import React from 'react'
import { Icon } from 'atoms'

class Darkmode extends React.Component {
  render() {
    return (
      <Icon className='nav-darkmode fas fa-adjust' color='white' size='md' 
      onClick={ () => {
      localStorage.setItem('viewMode', (localStorage.getItem('viewMode') || 'dark') === 'dark' ?
      'light' : 'dark'); 
      localStorage.getItem('viewMode') === 'dark' ?
      document.querySelector('.content-wrapper').classList.add('dark') :
      document.querySelector('.content-wrapper').classList.remove('dark') ;
      }} />
    )
  }
}

export default Darkmode