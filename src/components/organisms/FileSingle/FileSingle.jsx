
import React from 'react'
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

export default FileSingle
