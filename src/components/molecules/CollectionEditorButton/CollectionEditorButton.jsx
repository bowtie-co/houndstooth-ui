import React from 'react'
import { Button } from '../../atoms'

const CollectionEditorButton = ({ location, match }) => {
  const { pathname } = location
  const { username, repo } = match.params
  const onCollectionEditor = pathname.includes('/collection')
  return (
    <Button
      href={onCollectionEditor ? `/view/repos/${username}/${repo}/dir` : `/view/collections/${username}/${repo}/`}>
      { onCollectionEditor ? 'View File Editor' : 'View Collection Editor' }
    </Button>
  )
}

export default CollectionEditorButton
