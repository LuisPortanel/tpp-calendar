// @flow
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers'

import './YearPicker.scss'

type YearPickerType = {
    onYearChange(year: number): void
}

const YearPicker = ({ onYearChange }: YearPickerType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const handleDatePickerChange = Moment => {
    const year = Moment.format('YYYY')
    setSelectedYear(year)
    onYearChange(year)
    setIsOpen(false)
  }

  const handleInputChange = e => {
    const year = e.target.value
    setSelectedYear(year)

    // Only trigger API fetch until the year is valid
    if (year >= 1899 && year <= 2100) {
      onYearChange(year)
    }
  }

  const handleInputBlur = e => {
    // Timeout needed to listen click on DatePicker
    setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  return (<div className='YearPicker'>
    <TextField
      id="standard-number"
      label="Year"
      type="number"
      value={selectedYear}
      onChange={handleInputChange}
      onFocus={() => setIsOpen(true)}
      onBlur={handleInputBlur}
      InputProps={{
        inputProps: {
          min: 1899,
          max: 2100
        }
      }}
    />
    <div className='datepicker-container' style={{ display: isOpen ? 'block' : 'none' }}>
      <DatePicker
        variant='static'
        views={['year']}
        value={new Date().setFullYear(selectedYear)}
        onChange={handleDatePickerChange}
        animateYearScrolling={true}
      />
    </div>
  </div>)
}

export default YearPicker
