// import React from 'react';
import CollectionEditorButton from './CollectionEditorButton'
import { withRouter } from 'react-router'
import { withMaybe } from '@bowtie/react-utils'
import { compose } from 'recompose'

const nullConditionFn = ({ isCollectionable }) => !isCollectionable

export default compose(
  withRouter,
  withMaybe(nullConditionFn)
)(CollectionEditorButton)
