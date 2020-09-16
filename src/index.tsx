import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './shared/fontAwesome';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

const store = configureStore();

const app = (
  <Provider store={store}>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
