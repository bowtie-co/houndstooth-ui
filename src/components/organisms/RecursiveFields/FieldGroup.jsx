import React from 'react'
import PropTypes from 'prop-types'
import FieldSingle from './FieldSingle'

const FieldGroup = (props) => {
  const { title, fields, handleChange, location = '', ...rest } = props
  const fieldKeys = Object.keys(fields)

  return (
    <div className='field-group'>
      {title && <p className='bold'>{title}</p>}
      {
        fieldKeys.map(key => (
          <FieldSingle
            key={key}
            name={key}
            field={fields[key]}
            handleChange={handleChange}
            location={location}
            {...rest}
          />
        )
        )
      }

    </div>
  )
}

FieldGroup.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string,
  fields: PropTypes.object,
  handleChange: PropTypes.func
}

export default FieldGroup
