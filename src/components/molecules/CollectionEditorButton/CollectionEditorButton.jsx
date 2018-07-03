import React from 'react'
import { Button } from '../../atoms'

const CollectionEditorButton = ({ location }) => {
  const { pathname } = location
  const onCollectionEditor = pathname.includes('/collection')
  return (
    <Button
      href={onCollectionEditor ? `dir` : `collections`}>
      { onCollectionEditor ? 'View File Editor' : 'View Collection Editor' }
    </Button>
  )
}

export default CollectionEditorButton
