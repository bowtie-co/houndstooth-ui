import React from 'react'
import '../../scss/App.scss'
import { Input, Button, TimePicker } from '../atoms'
import FieldContainer from '../atoms/Field/FieldContainer'
import ComponentOneContainer from '../ComponentOne/ComponentOneContainer'
import Header from '../molecules/Header/Header'


const App = ({ mapFeatures }) => {
  return (
    <div className='app'>
      <Header title={'Welcome to Bowtie\'s React-Recompose Starter Kit'}/>
      <p className='intro'>
        This starter kit is preinstalled with:
      </p>
      {/* <Input /> */}
      <Button />
      <TimePicker />
      <FieldContainer 
        type={'text'}
      />
      <ul className='list'>
        { mapFeatures() }
      </ul>
      <ComponentOneContainer />
    </div>
  )
}

export default App
