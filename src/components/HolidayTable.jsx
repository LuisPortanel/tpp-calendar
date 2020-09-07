// @flow
import React, { useState } from 'react'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import RemoveHoliday from './RemoveHoliday'

import './HolidayTable.scss'

import { type HolidaysType } from '../redux/reducers/calendarReducer'

type HolidayTableType = {
    holidays: HolidaysType,
    removeHoliday(name: string): void
}

const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }: {count: number, page: number, rowsPerPage: number, onChangePage: any}) => {
  const handleFirstPageButtonClick = e => {
    onChangePage(e, 0)
  }

  const handleBackButtonClick = e => {
    onChangePage(e, page - 1)
  }

  const handleNextButtonClick = e => {
    onChangePage(e, page + 1)
  }

  const handleLastPageButtonClick = e => {
    onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div style={{ flexShrink: 0, marginLeft: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} >
        <LastPageIcon />
      </IconButton>
    </div>
  )
}

const HolidayTable = ({ holidays, removeHoliday }: HolidayTableType) => {
  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, holidays.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <TableContainer component={Paper} className='HolidayTable'>
      <Table style={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holidays
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(holiday => (
              <TableRow key={holiday.name}>
                <TableCell component="th" scope="row" title={holiday.name}>
                  <p className='truncate'>
                    {holiday.name}
                  </p>
                </TableCell>
                <TableCell style={{ maxWidth: 200 }} align="right">
                  {holiday.description}
                </TableCell>
                <TableCell align="right">
                  {holiday.date.iso}
                </TableCell>
                <TableCell align="right">
                  <RemoveHoliday holidayName={holiday.name} />
                </TableCell>
              </TableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 81 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={holidays.length}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[rowsPerPage]}
              page={page}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = ({ calendar }) => {
  const { holidays } = calendar
  console.log('mapState', calendar, holidays)

  return {
    holidays
  }
}

export default connect<any, any, any, any, any, any>(mapStateToProps)(HolidayTable)
