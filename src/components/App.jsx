// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { type Store as ReduxStore } from 'redux'
import { type State, type Action } from '../redux/reducers'
import { type BrowserHistory } from 'history'
import Nav from './Nav'
import Routes from '../routes'

import './App.scss'

type AppType = {
  store: ReduxStore<State, Action>,
  browserHistory: BrowserHistory
}

const App = ({ store, browserHistory }: AppType) => <Provider store={store}>
  <BrowserRouter>
    <Nav />
    <Routes />
  </BrowserRouter>
</Provider>

export default App
