// import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import PublicRoutes from './PublicRoutes'
import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'



//  Instead of rendering main component on home, render Login component and use the rest of the routes as PrivateRoutes.
const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <PublicRoutes />
      </div>
    </BrowserRouter>
  )
}

export default Routes
