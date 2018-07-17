import React from 'react'
import loading from './loading.svg'
import 'root/scss/Loading.css'

const Loading = () => {
  return (
    <div className='loader'>
      <img src={loading} alt='loading' />
    </div>
  )
}

export default Loading
