import React from 'react'
import { Button } from '../../atoms'

const CollectionEditorButton = ({ location, match }) => {
  const { pathname } = location
  const { username, repo } = match.params
  const onCollectionEditor = pathname.includes('/collection')
  return (
    <Button
      href={onCollectionEditor ? `/repos/${username}/${repo}/dir` : `/repos/${username}/${repo}/collections`}>
      { onCollectionEditor ? 'View File Editor' : 'View Collection Editor' }
    </Button>
  )
}

export default CollectionEditorButton
