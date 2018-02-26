import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import AppContainer from './Components/App/AppContainer';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'


//  This is an example of how to pass through props into a component.
//  Once building a new React App, delete this array.
const featureList = [
  'react router',
  'recompose',
  'css modules',
  'scss loaders',
  'Bowtie React utilities',
  'Bowtie Api helper',
  'Bowtie React file structure',
  'jest-enzyme library',
]

//  Instead of rendering main component on home, render Login component and use the rest of the routes as PrivateRoutes.
const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Route
          path="/"
          render={props => <AppContainer featureList={featureList} isLoading={false} />} 
        />
      </div>
    </BrowserRouter>
  )	
}

export default Routes
