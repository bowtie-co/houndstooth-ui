import PublicRoutes from './PublicRoutes'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const Routes = () => {
  return (
    <BrowserRouter>
      {/* <div> */}
      <PublicRoutes />
      {/* </div> */}
    </BrowserRouter>
  )
}

export default Routes
