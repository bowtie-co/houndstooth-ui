import React from 'react'
import {
  Search,
  FieldContainer
} from '../../molecules'
import { TopNav } from '../../organisms'
import ComponentOneContainer from '..//ComponentOne/ComponentOneContainer'

const App = ({ mapFeatures, formOnChange, ...rest }) => {
  return (
    <div className='app'>

      <TopNav />
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
    </div>
  )
}

export default App
