// @flow
import { SAVE_HOLIDAY_RESPONSE } from '../constants'

const initialState = {}

type CalendarReducer = typeof initialState
type CalendarState = CalendarReducer

export type HolidaysType = Array<{|
  country: {
    id: string,
    name: string
  },
  date: {
    year: number,
    month: number,
    day: number,
    iso: string
  },
  description: string,
  locations: string,
  name: string,
  states: string,
  type: Array<string>
|}>
export type CalendarAction = {|
  +type: string,
  holidays: HolidaysType
|}

const calendarReducer = (state: CalendarState = initialState, action: CalendarAction): CalendarReducer => {
  switch (action.type) {
    case SAVE_HOLIDAY_RESPONSE:
      return {
        ...state,
        holidays: action.holidays
      }

    default:
      return state
  }
}

export default calendarReducer
