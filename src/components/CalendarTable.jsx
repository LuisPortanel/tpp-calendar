// @flow
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import YearPicker from './YearPicker'

export const CalendarTable = () => {
  const { countryCode } = useParams()

  return (
    <div>
      <h2>Calendar</h2>
      <p>Id: {countryCode}</p>
      <YearPicker />
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect<any, any, any, any, any, any>(mapStateToProps, mapDispatchToProps)(CalendarTable)
