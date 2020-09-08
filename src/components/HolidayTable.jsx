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
import moment from 'moment'

import './HolidayTable.scss'

import { type HolidaysType } from '../redux/reducers/calendarReducer'

type HolidayTableType = {|
    holidays: HolidaysType,
    removeHoliday(name: string): void
|}

type TablePaginationActionsType = {|
  count: number,
  page: number,
  rowsPerPage: number,
  onChangePage(event: SyntheticEvent<HTMLButtonElement>, page: number): void
|}

const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }: TablePaginationActionsType) => {
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

  // If the page is empty after deleting, move backwards one page
  if (page >= Math.ceil(holidays.length / rowsPerPage) && holidays.length > 0) {
    setPage(page - 1)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, holidays.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <TableContainer component={Paper} className='HolidayTable'>
      <Table style={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell className='truncate'>Name</TableCell>
            <TableCell>Launch Year</TableCell>
            <TableCell>Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holidays
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((holiday, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row" title={holiday.name} align="left">
                  <p className='truncate'>
                    {holiday.name}
                  </p>
                </TableCell>
                <TableCell>
                  {holiday.launchYear ? moment(`${holiday.launchYear}`, 'YYYY', true).format('MM/DD/YYYY') : '-'}
                </TableCell>
                <TableCell>
                  {`${holiday.date} ${moment(holiday.date, 'YYYY-MM-DD').fromNow()}`}
                </TableCell>
                <TableCell>
                  <RemoveHoliday holidayDate={holiday.date} holidayName={holiday.name} />
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

  return {
    holidays
  }
}

export default connect<any, any, any, any, any, any>(mapStateToProps)(HolidayTable)
