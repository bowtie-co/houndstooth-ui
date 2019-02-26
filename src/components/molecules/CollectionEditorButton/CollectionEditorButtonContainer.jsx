// import React from 'react';
import CollectionEditorButton from './CollectionEditorButton'
import { withRouter } from 'react-router'
import { withMaybe } from '@bowtie/react-utils'
import { compose, withProps } from 'recompose'
import qs from 'qs'

const nullConditionFn = ({ isCollectionable }) => !isCollectionable

export default compose(
  withRouter,
  withMaybe(nullConditionFn),
  withProps((props) => {
    const { queryParams, collections, match, baseRoute, collectionPath, branch } = props

    const { collection, item, type } = match.params
    const { path = '' } = queryParams

    const collArr = path.match(/_([^/]+)/)
    const collPathArr = path.match(/_([^]+)/)

    const isCollection = collArr && collArr[1] ? collections.includes(collArr[1]) : false
    const onCollectionEditor = type === 'collections'

    const collectionRoute = `/${baseRoute}/collections/${isCollection && collPathArr && collPathArr[1] ? collPathArr[1] : ''}?${qs.stringify(queryParams)}`
    const fileRoute = item && collection ? `/${baseRoute}/file?${qs.stringify(Object.assign({}, queryParams, { path: `${collectionPath}/${item}`, ref: branch }))}` : `/${baseRoute}/dir?${qs.stringify(queryParams)}`

    return {
      onCollectionEditor,
      fileRoute,
      collectionRoute
    }
  })
)(CollectionEditorButton)
