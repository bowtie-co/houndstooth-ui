/*  global atob  */
import React from 'react'
import AceEditor from 'react-ace'
import PropTypes from 'prop-types'
import { lists } from 'helpers'

import 'brace/mode/markdown'
import 'brace/mode/javascript'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/ruby'
import 'brace/theme/terminal'

const TextEditor = ({ content, name, onChange }) => {
  const ext = name.match(/.*\.([^.]+)/) ? name.match(/.*\.([^.]+)/)[1] : 'md'
  const { languages } = lists
  const lang = languages[ext] || ext
  return (
    <AceEditor
      mode={lang}
      width={'100%'}
      maxLines={'Infinity'}
      focus
      className={'file-editor'}
      wrapEnabled
      theme='terminal'
      name={`file-editor-${name}`}
      // onLoad={this.onLoad}
      editorProps={{$blockScrolling: true}}
      onChange={(newValue) => onChange(newValue)}
      fontSize={15}
      showPrintMargin
      showGutter
      highlightActiveLine
      value={atob(content)}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  )
}

TextEditor.propTypes = {
  content: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextEditor
