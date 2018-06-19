import React from 'react'
import {
  Header,
  Search,
  FieldContainer
} from '../../molecules'
import {
  MultiColumn
} from '../../templates'
import ComponentOneContainer from '..//ComponentOne/ComponentOneContainer'

const Fuck = () => <h1>Fuck</h1>
const Shit = () => <h1>Shit</h1>
const Butts = () => <h1>Butts</h1>

const App = ({ mapFeatures, formOnChange, ...rest }) => {
  return (
    <div className='app'>

      <Header title={'Welcome to Bowtie\'s React-Recompose Starter Kit'} />
      <p className='intro'>
        This starter kit is preinstalled with:
      </p>
      <Search />
      <FieldContainer
        label={'text input'}
        type={'text'}
        onChange={formOnChange}
      />
      <FieldContainer
        label={'radio'}
        type={'radio'}
        onChange={formOnChange}
        options={[{ label: 'this', value: 1 }, { label: 'that', value: 2 }, { label: 'shit', value: 3 }]}
      />
      <FieldContainer
        label={'select'}
        type={'select'}
        onChange={formOnChange}
      />
      <FieldContainer
        label={'checkbox'}
        type={'checkbox'}
        onChange={formOnChange}
      />
      <FieldContainer
        label={'datepicker'}
        type={'datepicker'}
        onChange={formOnChange}
      />
      <FieldContainer
        label={'timepicker'}
        type={'timepicker'}
        onChange={formOnChange}
      />
      <FieldContainer
        label={'multiselect'}
        type={'multiselect'}
        onChange={formOnChange}
      />
      <ul className='list'>
        { mapFeatures() }
      </ul>
      <ComponentOneContainer />
      <MultiColumn
        columns={[Fuck, Shit, Butts]}
        {...rest}
      />
    </div>
  )
}

export default App
