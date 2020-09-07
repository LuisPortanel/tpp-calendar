// @flow
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { type BrowserHistory } from 'history'

/* type CalendarTableType = {
    browserHistory: BrowserHistory
} */

export const CalendarTable = () => {
  const { countryCode } = useParams()

  return (
    <div>
      <h2>Calendar</h2>
      <p>Id: {countryCode}</p>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect<any, any, any, any, any, any>(mapStateToProps, mapDispatchToProps)(CalendarTable)
