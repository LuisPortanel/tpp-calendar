// @flow
import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { REMOVE_HOLIDAY } from '../redux/constants'

type RemoveHolidayType = {
    holidayDate: string,
    holidayName: string,
    removeHoliday(holidayDate: string, holidayName: string): void
}

const RemoveHoliday = ({ holidayDate, holidayName, removeHoliday }: RemoveHolidayType) => {
  const [dialogopen, setDialogOpen] = React.useState(false)

  const handleOpen = () => {
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }
  const handleRemoveHoliday = () => {
    removeHoliday(holidayDate, holidayName)
    setDialogOpen(false)
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <HighlightOffIcon />
      </IconButton>
      <Dialog
        open={dialogopen}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{`Remove ${holidayName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this holiday?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveHoliday} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  removeHoliday: (date, name) => dispatch({
    type: REMOVE_HOLIDAY,
    date,
    name
  })
})

export default connect<any, any, any, any, any, any>(null, mapDispatchToProps)(RemoveHoliday)
