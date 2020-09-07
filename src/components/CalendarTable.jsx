// @flow
import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import YearPicker from './YearPicker'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SAVE_HOLIDAY_RESPONSE } from '../redux/constants'
import { type HolidaysType } from '../redux/reducers/calendarReducer'

type StatusType = {|
  isLoading: boolean,
  response: {| status: string, text: string |}
|}

type CalendarType = {
  holidays: HolidaysType,
  saveHolidayResponse(responseHolidays: Array<HolidaysType>): void
}

export const CalendarTable = ({
  holidays,
  saveHolidayResponse
}: CalendarType) => {
  const { countryCode } = useParams()

  const sourceRef = useRef(null)
  const [year, setYear] = useState(new Date().getFullYear())
  const [status, setStatus] = useState<StatusType>({
    isLoading: false,
    response: {
      text: '',
      status: ''
    }
  })

  useEffect(() => {
    // We generate a CancelToken to avoid subsecuent calls to the API
    sourceRef.current && sourceRef.current.cancel('Fetching cancelled.')
    sourceRef.current = axios.CancelToken.source()
    const cancelToken = sourceRef.current.token

    setStatus({
      ...status,
      isLoading: true
    })
    if (countryCode) {
      axios.get(`https://calendarific.com/api/v2/holidays?api_key=439be7545f2d747562a001fdabf7cec60e7e05e3&type=national&country=${countryCode}&year=${year}`, {
        cancelToken
      }).then(res => {
        setStatus({
          isLoading: false,
          response: {
            text: 'Success',
            status: 'success'
          }
        })
        saveHolidayResponse(res.data.response.holidays)
        console.log(res.data.response.holidays)
      })
        .catch(err => {
          console.warn(err)
          if (axios.isCancel(err)) {
            console.log('Request canceled', err)
          } else if (err.response) {
            setStatus({
              isLoading: false,
              response: {
                text: err.response.data.description,
                status: 'error'
              }
            })
          } else {
            setStatus({
              isLoading: false,
              response: {
                text: 'Fatal error. Try again later.',
                status: 'error'
              }
            })
          }
        })
    }

    return () => {}
    // eslint-disable-next-line
    }, [year, countryCode])

  return (
    <div>
      <h2>Calendar</h2>
      <p>Id: {countryCode}</p>
      <YearPicker onYearChange={year => setYear(year)}/>
      {
        status.isLoading
          ? <div><CircularProgress /></div>
          : <h3>Fetching done. Here we&apos;ll show the table.</h3>
      }
    </div>
  )
}

const mapStateToProps = ({ calendar }) => {
  const { holidays } = calendar

  return {
    holidays
  }
}

const mapDispatchToProps = dispatch => ({
  saveHolidayResponse: holidays => dispatch({
    type: SAVE_HOLIDAY_RESPONSE,
    holidays
  })
})

export default connect<any, any, any, any, any, any>(mapStateToProps, mapDispatchToProps)(CalendarTable)
