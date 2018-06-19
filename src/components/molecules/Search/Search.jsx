import React from 'react'
import {
  FieldContainer
} from '../../atoms'

const Search = () => {
  return (
    <div className='search-mol'>
      <FieldContainer 
        type={'text'}
        placeholder={'Enter a Keyword...'}
      />
      <FieldContainer 
        type={'button'}
        label={'Search'}
      />
    </div>
  )
}

export default Search