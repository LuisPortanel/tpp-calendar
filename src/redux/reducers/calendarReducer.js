// @flow

const initialState = {}

type CalendarReducer = typeof initialState
type CalendarState = CalendarReducer

export type CalendarAction = {|
  +type: string
|}

const calendarReducer = (state: CalendarState = initialState, action: CalendarAction): CalendarReducer => {
  switch (action.type) {
    default:
      return state
  }
}

export default calendarReducer
