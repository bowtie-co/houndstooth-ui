import React from 'react'
import { Button } from 'atoms'

const CollectionEditorButton = ({ location, match, branch = 'master' }) => {
  const { pathname } = location
  const { username, repo, collection, item } = match.params
  const onCollectionEditor = pathname.includes('/collection')
  const fileRoute = item && collection ? `/repos/${username}/${repo}/file?path=_${collection}/${item}&ref=${branch}` : `/repos/${username}/${repo}/dir`
  const collectionRoute = `/repos/${username}/${repo}/collections`
  return (
    <Button
      href={onCollectionEditor ? fileRoute : collectionRoute}
      disabled={!repo && !username}>
      { onCollectionEditor ? 'File Editor' : 'Collection Editor' }
    </Button>
  )
}

// const CollectionEditorButton = ({ baseRoute, location, match }) => {
//   const { pathname } = location
//   const { username, repo } = match.params
//   const onCollectionEditor = pathname.includes('/collection')
//   return (
//     <Button
//       href={onCollectionEditor ? `${baseRoute}/dir` : `${baseRoute}/collections`}
//       disabled={!repo && !username}>
//       {onCollectionEditor ? 'View File Editor' : 'View Collection Editor'}
//     </Button>
//     // <Button href={`/${baseRoute}/dir?ref=${queryParams['ref'] || 'master'}`} disabled={!repo && !username}>File Editor</Button>
//   )
// }

export default CollectionEditorButton
