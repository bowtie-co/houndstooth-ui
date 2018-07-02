/* global atob */

import React from 'react'
import { Card, TextEditor, Button } from '../../atoms'

const FileSingle = ({ file, content, setContent, setStagedFiles }) => {
  console.log('file content: ', atob(content))
  return (
    <Card>
      <TextEditor
        content={content}
        name={file.name}
        onChange={setContent}
      />
      <Button onClick={() => setStagedFiles(content)} >Save</Button>
    </Card>
  )
}

export default FileSingle
