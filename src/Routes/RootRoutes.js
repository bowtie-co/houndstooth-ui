import React from 'react'
import { Route } from 'react-router-dom'
import LoginRedirect from '../Components/PrivateRoute/LoginRedirect'
import NavBarContainer from '../Components/NavBar/NavBarContainer'
import TrackingContainer from '../Components/Tracking/TrackingContainer'
import NotificationsContainer from '../Components/Notifications/NotificationsContainer'

const RootRoutes = () => {
  return (
    <div>
      <Route
        path='/'
        render={props => (
          <div>
            <TrackingContainer {...props} />
            <NotificationsContainer {...props} />
            <NavBarContainer {...props} />
          </div>
        )}
      />
      <Route
        exact
        path='/'
        component={LoginRedirect}
      />
    </div>
  )
}

export default RootRoutes
