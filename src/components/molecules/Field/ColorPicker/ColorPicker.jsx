import React from 'react'
import SketchPicker from 'react-color'

const ColorPicker = ({ open, toggleState, handleColorChange, handleClose, value }) => {
  return (
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
  )
}

export default ColorPicker
