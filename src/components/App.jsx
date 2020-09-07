// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, type RouterHistory } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Nav from './Nav'
import Routes from '../routes'

import { type Store as ReduxStore } from 'redux'
import { type State, type Action } from '../redux/reducers'

import './App.scss'

type AppType = {
  store: ReduxStore<State, Action>,
  browserHistory: RouterHistory
}

const App = ({ store, browserHistory }: AppType) => <Provider store={store}>
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <BrowserRouter>
      <Nav />
      <Routes />
    </BrowserRouter>
  </MuiPickersUtilsProvider>
</Provider>

export default App
