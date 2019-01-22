import React from 'react'
import { Button } from 'atoms'

const CollectionEditorButton = ({ location, match, baseRoute, queryParams, branch = 'master', onCollectionEditor, fileRoute, collectionRoute }) => {
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

// const CollectionEditorButton = ({ baseApiRoute, location, match }) => {
//   const { pathname } = location
//   const { username, repo } = match.params
//   const onCollectionEditor = pathname.includes('/collection')
//   return (
//     <Button
//       href={onCollectionEditor ? `${baseApiRoute}/dir` : `${baseApiRoute}/collections`}
//       disabled={!repo && !username}>
//       {onCollectionEditor ? 'View File Editor' : 'View Collection Editor'}
//     </Button>
//     // <Button href={`/${baseApiRoute}/dir?ref=${queryParams['ref'] || 'master'}`} disabled={!repo && !username}>File Editor</Button>
//   )
// }

export default CollectionEditorButton
