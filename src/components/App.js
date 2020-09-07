// @flow
import React from 'react'
import { Provider } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CountriesMenu from './CountriesMenu'
import { type Store as ReduxStore } from 'redux'
import { type State, type Action } from '../redux/reducers'
import './App.scss'

type AppType = {
  store?: ReduxStore<State, Action>
}

const App = ({ store }: AppType) => <Provider store={store}>
  <div className='App'>
    <AppBar position="static">
      <Toolbar>
        <CountriesMenu />
      </Toolbar>
    </AppBar>
  </div>
</Provider>

export default App
