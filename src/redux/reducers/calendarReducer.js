// @flow
import { SAVE_HOLIDAY_RESPONSE, REMOVE_HOLIDAY } from '../constants'

const initialState = {}

type CalendarReducer = typeof initialState
type CalendarState = CalendarReducer

export type HolidaysType = Array<{|
  counties: Array<string> | null,
  countryCode: string,
  date: string,
  fixed: boolean,
  global: boolean,
  launchYear: number | null,
  localName: string,
  name: string,
  type: string
|}>
export type CalendarAction = {|
  +type: string,
  holidays: HolidaysType,
  date: string,
  name: string
|}

const calendarReducer = (state: CalendarState = initialState, action: CalendarAction): CalendarReducer => {
  switch (action.type) {
    case SAVE_HOLIDAY_RESPONSE:
      return {
        ...state,
        holidays: action.holidays
      }

    case REMOVE_HOLIDAY:
      return {
        ...state,
        holidays: state.holidays.filter(holiday => holiday.date !== action.date || holiday.name !== action.name)
      }

    default:
      return state
  }
}

export default calendarReducer
