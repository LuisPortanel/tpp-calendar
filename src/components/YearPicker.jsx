import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers'

function YearPicker () {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const handleDatePickerChange = Moment => {
    setSelectedYear(Moment.format('YYYY'))
    setIsOpen(false)
  }

  const handleInputChange = e => {
    setSelectedYear(e.target.value)
  }

  const handleInputBlur = e => {
    // Timeout needed to listen click on DatePicker
    setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  return (<>
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
    <div style={{ width: 310, display: isOpen ? 'block' : 'none' }}>
      <DatePicker
        variant='static'
        views={['year']}
        value={new Date().setFullYear(selectedYear)}
        onChange={handleDatePickerChange}
        animateYearScrolling={true}
      />
    </div>
  </>)
}

export default YearPicker
