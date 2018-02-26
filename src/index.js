import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.scss';
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes';
import AppContainer from './Components/App/AppContainer';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
