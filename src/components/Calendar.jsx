// @flow
import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import YearPicker from './YearPicker'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SAVE_HOLIDAY_RESPONSE } from '../redux/constants'
import { type HolidaysType } from '../redux/reducers/calendarReducer'
import HolidayTable from './HolidayTable'

import { countryNameByCode } from '../utils'

import './Calendar.scss'

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
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    // We generate a CancelToken to avoid subsecuent calls to the API
    sourceRef.current && sourceRef.current.cancel('Fetching cancelled.')
    sourceRef.current = axios.CancelToken.source()
    const cancelToken = sourceRef.current.token

    setIsFetching(true)
    if (countryCode) {
      /*   The API is misconfigured. It doesn't include Access-Control-Allow-Origin headers.
        *  Due to this, it doesn't allow requests made by external domains.
        *  This can be bypassed with a CORS browser plugin, but in this case
        *  I used a proxy to avoid this problem:
        *  PROXY: https://cors-anywhere.herokuapp.com
        * */
      axios.get(`https://cors-anywhere.herokuapp.com/https://date.nager.at/api/v2/PublicHolidays/${year}/${countryCode}`, {
        cancelToken
      }).then(res => {
        saveHolidayResponse(res.data)
        setIsFetching(false)
      })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.warn('Request canceled', err)
          } else if (err.response) {
            console.warn(err.response)
            setIsFetching(false)
          } else {
            console.warn(err)
            setIsFetching(false)
          }
        })
    }

    return () => {}
    // eslint-disable-next-line
    }, [year, countryCode])

  return (
    <div className="Calendar">
      <h2>{countryNameByCode(countryCode)}</h2>
      <YearPicker onYearChange={year => setYear(year)}/>
      {
        isFetching
          ? <div className="fetchingProgress">
            <CircularProgress />
          </div>
          : <HolidayTable />
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  saveHolidayResponse: holidays => dispatch({
    type: SAVE_HOLIDAY_RESPONSE,
    holidays
  })
})

export default connect<any, any, any, any, any, any>(null, mapDispatchToProps)(CalendarTable)
