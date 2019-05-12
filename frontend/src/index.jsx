// Css
import 'Styles'
import 'react-input-range/lib/css/index.css'

// Polyfills
import 'babel-polyfill'

// React
import React from 'react'
import ReactDOM from 'react-dom'
// Redux
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import allReducers from 'Reducers/index.js'

// App
import App from 'Containers/app.jsx'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    allReducers,
    composeEnhancer(applyMiddleware(thunk)),
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
)







