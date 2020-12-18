import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureAppStore from './store';

import App from './App';

ReactDOM.render(
    <Provider store={configureAppStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);