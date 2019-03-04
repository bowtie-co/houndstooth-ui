import React from 'react'

const ErrorPage = (props) => {
  return (
    <section className='section text-center' style={{ padding: '25px' }}>
      <img src='/HT_red.png' alt='Houndstooth Logo' style={{ margin: '25px' }} />
      <br />
      <h1>Unknown Error</h1>
      <h2>OOPS! There was an issue loading this page.</h2>
      <p>This issue has been tracked and will be reviewed.</p>
      <br />
      <a className='btn btn-primary' href='/'>Return to Home</a>
    </section>
  )
}

export default ErrorPage
