import React from 'react'
import { FieldContainer } from '../../molecules'
import FieldGroup from './FieldGroup'

const FieldSingle = (props) => {
  const { name, field, handleChange, location = '' } = props
  const currentLocation = location === '' ? name : `${location}.${name}`

  if (Array.isArray(field)) {
    return <FieldGroup title={name} fields={{}} location={currentLocation} handleChange={handleChange} />
  } else if (field && typeof field === 'object') {
    return <FieldGroup title={name} fields={field} location={currentLocation} handleChange={handleChange} />
  } else {
    return (
      <FieldContainer
        key={name}
        name={name}
        label={name}
        placeholder={name}
        value={field}
        onChange={(e) => handleChange(currentLocation, e.target.value)}
      />
    )
  }
}

export default FieldSingle
