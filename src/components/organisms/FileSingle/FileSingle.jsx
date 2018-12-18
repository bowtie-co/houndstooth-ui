/* eslint no-restricted-syntax: ['import'] */

import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'atoms'
const TextEditor = React.lazy(() => import('atoms/TextEditor'))

const FileSingle = ({ file, content, setContent, saveFile }) => {
  return (
    <Card>
      <Suspense fallback={<div>Loading...</div>}>
        <TextEditor
          content={content}
          name={file.name}
          onChange={setContent}
        />
      </Suspense>
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
