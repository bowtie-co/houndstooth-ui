import React from 'react'
import PropTypes from 'prop-types'
import SketchPicker from 'react-color'
import { FormGroup } from 'atoms'

const ColorPicker = ({ open, toggleState, handleColorChange, handleClose, value, ...rest }) => {
  return (
    <FormGroup floatLabel {...rest}>
      <div className='inner-group'>

        <div>
          <div className='input-group'>
            <span className='input-group-addon'
              style={({ backgroundColor: value, width: '30px' })} />

            <input
              type='text'
              className='form-control'
              onClick={toggleState}
              value={value || ''}
              readOnly />

          </div>

          <div
            style={({ display: open ? 'block' : 'none' })}
            onClick={handleClose}>

            <SketchPicker
              color={value || '#000'}
              type='chrome'
              display={open}
              position='below'
              onChange={handleColorChange}
              onClose={handleClose}
            />

          </div>
        </div>
      </div>
    </FormGroup>
  )
}

ColorPicker.propTypes = {
  open: PropTypes.bool,
  toggleState: PropTypes.func,
  handleColorChange: PropTypes.func,
  handleClose: PropTypes.func,
  value: PropTypes.string
}

export default ColorPicker
