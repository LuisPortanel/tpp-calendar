// @flow
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import './CountriesMenu.scss'

export const CountriesMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)

  const handleMenuClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuItemClick = e => {
    closeMenu()
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <div className='CountriesMenu'>
      <Button onClick={handleMenuClick}>
        <Typography variant="h6">Holidays</Typography>
      </Button>
      <Menu
        id="countries-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        // This must be null to get the vertical properties to work
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem
          component={Link}
          to="/us"
          onClick={handleMenuItemClick}
        >United States</MenuItem>
        <MenuItem
          component={Link}
          to="/ca"
          onClick={handleMenuItemClick}
        >Canada</MenuItem>
        <MenuItem
          component={Link}
          to="/ar"
          onClick={handleMenuItemClick}
        >Argentina</MenuItem>
      </Menu>
    </div>
  )
}

export default CountriesMenu
