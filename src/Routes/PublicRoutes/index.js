import AppContainer from '../../components/App/AppContainer'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

//  This is an example of how to pass through props into a component.
//  Once building a new React App, delete this array.
const featureList = [
  'react router',
  'recompose',
  'scss loaders',
  'Bowtie React utilities',
  'Bowtie Api helper',
  'Bowtie React file structure',
  'jest-enzyme library'
]

const PublicRoutes = () => {
  return (
    <Switch>
      <Route
        path='/'
        render={() => <AppContainer featureList={featureList} isLoading={false} />}
      />
    </Switch>
  )
}

export default PublicRoutes
