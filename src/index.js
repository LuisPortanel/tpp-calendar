import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import { createBrowserHistory } from 'history'

const browserHistory = createBrowserHistory()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
)

const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.render(
    <App store={store} browserHistory={browserHistory} />,
    root
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
