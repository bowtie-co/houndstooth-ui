
import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Tabs,
  Icon
} from 'atoms'
import {
  ItemForm
} from 'organisms'

export const Collections = (props) => {
  const { items, selectItem } = props
  return (
    <section>
      <Icon onClick={() => selectItem()} iconName='plus-circle' />
      <div className='collections-section'>
        <Tabs
          onClick={selectItem}
          tabs={items}
          vertical
        >
          <ItemForm
            {...props}
          />

        </Tabs>
      </div>
    </section>
  )
}

/** *********** EMPTY STATE ********************/

export const EmptyState = (props) => {
  const { queryParams, baseRoute } = props
  return (
    <section>
      <div>This project does not have collections. Please edit files directly user the File Editor.</div>
      <Button href={`/${baseRoute}/dir?ref=${queryParams['ref']}`}>File Editor</Button>
    </section>
  )
}

export const EmptyItem = (props) => {
  return (
    <section>
      <div>Select an item from your collection</div>
    </section>
  )
}

/** *********** PROPTYPES ********************/

Collections.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.array,
  selectItem: PropTypes.func.isRequired
}

// export default Collections
