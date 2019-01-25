import React from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from './Routes/routes'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Routes />, document.getElementById('root'))
registerServiceWorker()
