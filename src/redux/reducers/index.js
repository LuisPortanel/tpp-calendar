// @flow
import { combineReducers } from 'redux'
import calendarReducer, { type CalendarAction } from './calendarReducer'

const reducers = {
  calendar: calendarReducer
}

export type State = typeof reducers
export type Action = {| ...CalendarAction |}

export default combineReducers<State, Action>(reducers)
