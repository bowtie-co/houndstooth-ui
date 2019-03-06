import React from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from './Routes/routes'
import { ErrorBoundary } from 'ecosystems'
import registerServiceWorker from './registerServiceWorker'

registerServiceWorker()

const RoutesWithErrorBoundary = () => (
  <ErrorBoundary>
    <Routes />
  </ErrorBoundary>
)

ReactDOM.render(<RoutesWithErrorBoundary />, document.getElementById('root'))
