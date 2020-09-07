// @flow
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CountriesMenu from './CountriesMenu'

const Nav = () =>
  <div className='App'>
    <AppBar position="static">
      <Toolbar>
        <CountriesMenu />
      </Toolbar>
    </AppBar>
  </div>

export default Nav
