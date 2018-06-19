import React from 'react'
import {
  FieldContainer
} from '../'
import { Button } from '../../atoms'

const Search = () => {
  return (
    <div className='search-mol'>
      <FieldContainer
        type={'text'}
        placeholder={'Enter a Keyword...'}
      />
      <Button label={'Search'} />

    </div>
  )
}

export default Search
