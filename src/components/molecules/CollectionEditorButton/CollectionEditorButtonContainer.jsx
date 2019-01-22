// import React from 'react';
import CollectionEditorButton from './CollectionEditorButton'
import { withRouter } from 'react-router'
import { withMaybe } from '@bowtie/react-utils'
import { compose, withProps } from 'recompose'

const nullConditionFn = ({ isCollectionable }) => !isCollectionable

export default compose(
  withRouter,
  withMaybe(nullConditionFn),
  withProps(({ queryParams, collections, match, baseRoute, branch = 'master' }) => {
    const { collection, item } = match.params
    const { path = '' } = queryParams

    const coll = path.match(/_([^]+)/)[1]
    const isCollection = collections.includes(coll)
    const onCollectionEditor = !!collection

    // TODO: Need to remove the underscore from the collection for construct the correct path.

    const collectionRoute = `/${baseRoute}/collections/${isCollection && path}?path=${path}`
    const fileRoute = item && collection ? `/${baseRoute}/file?path=_${collection}/${item}&ref=${branch}` : `/${baseRoute}/dir`

    return {
      onCollectionEditor,
      fileRoute,
      collectionRoute
    }
  })
)(CollectionEditorButton)
