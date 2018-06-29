import React from 'react'
import { Card, TextEditor } from '../../atoms'
import { withMaybe } from '@bowtie/react-utils'

const nullConditionFn = ({ file }) => Object.keys(file).length === 0

const FileSingle = ({ file }) => {
  console.log('this is file', file)

  return (
    <Card>
      this is a single file comp
      <TextEditor file={file} />
    </Card>
  )
}

export default withMaybe(nullConditionFn)(FileSingle)
