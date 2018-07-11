import React from 'react'
import { withMaybe } from '@bowtie/react-utils'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const WysiwygEditor = (props) => {
  const { content, handleMarkdownChange } = props
  return (
    <ReactQuill
      value={content || ''}
      onChange={handleMarkdownChange}
    />
  )
}

// const nullConditionFn = ({ content }) => content === null
// withMaybe(nullConditionFn)(WysiwygEditor)

export default WysiwygEditor
