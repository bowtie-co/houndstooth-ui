import React from 'react'
import loading from './bowtie-loader.gif'
import 'scss/Loading.css'

const Loading = () => {
  return (
    <div className='loader'>
      <img src={loading} className='loader' alt='loading' />
    </div>
  )
}

export default Loading
