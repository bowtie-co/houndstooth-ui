import React from 'react'
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

export default WysiwygEditor
