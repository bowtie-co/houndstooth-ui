import React from 'react'
import PropTypes from 'prop-types'
import 'react-datetime/css/react-datetime.css'
import Select from 'react-select'

const DateTimeSelect = (props) => {
  const { type, onTypeChange, component: Component, ...rest } = props
  return (
    <div className='time-select' >
      <Select
        value={type}
        onChange={onTypeChange}
        clearable={false}
        options={[
          { value: 'date', label: 'date', selected: (type === 'date') },
          { value: 'time', label: 'time', selected: (type === 'time') },
          { value: 'datetime', label: 'datetime', selected: (type === 'datetime') }
        ]}
      />
      <Component {...rest} />
    </div >
  )
}

DateTimeSelect.propTypes = {
  type: PropTypes.string,
  onTypeChange: PropTypes.func,
  component: PropTypes.func
}

export default DateTimeSelect
