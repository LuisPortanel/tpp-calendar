// @flow
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CountriesMenu from './CountriesMenu'
import Typography from '@material-ui/core/Typography'

const Nav = () =>
  <div className='App'>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">TPP Calendar</Typography>
        <CountriesMenu />
      </Toolbar>
    </AppBar>
  </div>

export default Nav
