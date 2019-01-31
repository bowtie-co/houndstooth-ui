import React from 'react'
import { Button } from 'atoms'

const CollectionEditorButton = ({ match, onCollectionEditor, fileRoute, collectionRoute }) => {
  const { username, repo } = match.params
  return (
    <Button
      className='btn-sm'
      href={onCollectionEditor ? fileRoute : collectionRoute}
      disabled={!repo && !username}>
      { onCollectionEditor ? 'File Editor' : 'Collection Editor' }
    </Button>
  )
}

export default CollectionEditorButton
