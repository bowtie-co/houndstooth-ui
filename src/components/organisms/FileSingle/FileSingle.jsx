import React from 'react'
import PropTypes from 'prop-types'
import { Card, TextEditor, Button } from 'atoms'

const FileSingle = ({ file, content, setContent, saveFile }) => {
  return (
    <Card>
      <TextEditor
        content={content}
        name={file.name}
        onChange={setContent}
      />
      <Button onClick={() => saveFile(content)} >Save</Button>
    </Card>
  )
}

FileSingle.propTypes = {
  file: PropTypes.object,
  content: PropTypes.string,
  setContent: PropTypes.func,
  saveFile: PropTypes.func
}

export default FileSingle
