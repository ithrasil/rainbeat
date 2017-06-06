// Css
import './css/index.scss';
import 'react-input-range/lib/css/index.css';

// Polyfills
import 'babel-polyfill';

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers/index.jsx';

// App
import App from "./app.jsx";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);




  


