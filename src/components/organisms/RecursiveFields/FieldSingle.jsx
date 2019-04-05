import React from 'react'
import PropTypes from 'prop-types'
import { FieldContainer } from 'molecules'
import { titleize } from '@bowtie/utils'
import FieldGroup from './FieldGroup'

const FieldSingle = (props) => {
  const { name, field, handleChange, location = '', ...rest } = props
  const currentLocation = location === '' ? name : `${location}.${name}`
  if (field && field instanceof Object && !Array.isArray(field)) {
    return (
      <FieldGroup
        title={titleize(name, '_')}
        fields={field}
        location={currentLocation}
        handleChange={handleChange}
        {...rest}
      />
    )
  } else if (Array.isArray(field) && field.length > 0 && field[0] instanceof Object) {
    return (
      <div className='field-group'>
        {titleize(name, '_')}
        {
          field.map((obj, i) => {
            return (
              <FieldGroup
                title={`#${i + 1}`}
                fields={obj}
                location={`${currentLocation}.${i}`}
                handleChange={handleChange}
                {...rest}
              />
            )
          })
        }
      </div>
    )
  } else {
    if (Array.isArray(field) && (field.length === 0 || typeof field[0] === 'string')) {
      rest['creatable'] = true
      rest['options'] = field.map(i => ({ value: i, label: i }))
    }
    return (
      <FieldContainer
        clearable
        key={name}
        name={name}
        label={titleize(name, '_')}
        placeholder={field !== '' && name}
        value={field}
        onChange={(e) => handleChange(currentLocation, e.target.value)}
        {...rest}
      />
    )
  }
}

FieldSingle.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  fields: PropTypes.object,
  handleChange: PropTypes.func
}

export default FieldSingle
