import React from 'react'
import FieldSingle from './FieldSingle'

const FieldGroup = (props) => {
  const { title, fields, handleChange, location = '' } = props
  const fieldKeys = Object.keys(fields)

  return (
    <div className='field-group'>
      {title && <p>{title}</p>}
      {fieldKeys.map(key =>
        <FieldSingle
          key={key}
          name={key}
          field={fields[key]}
          handleChange={handleChange}
          location={location}
        />
      )}
    </div>
  )
}

export default FieldGroup
