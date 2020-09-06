// @flow
import { combineReducers } from 'redux'
import configReducer, { type CalendarAction } from './calendarReducer'

const reducers = {
  config: configReducer
}

export type State = typeof reducers
export type Action = {| ...CalendarAction |}

export default combineReducers<State, Action>(reducers)
