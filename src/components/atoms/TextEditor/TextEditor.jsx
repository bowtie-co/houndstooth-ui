/*  global atob  */
import React from 'react'
import AceEditor from 'react-ace'
import PropTypes from 'prop-types'

import 'brace/mode/markdown'
import 'brace/mode/javascript'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/ruby'
import 'brace/theme/monokai'

const languages = {
  js: 'javascript',
  jsx: 'javascript',
  rb: 'ruby',
  ru: 'ruby',
  md: 'markdown',
  py: 'python'
}

const TextEditor = ({ content, name, onChange }) => {
  const ext = name.match(/.*\.([^.]+)/) ? name.match(/.*\.([^.]+)/)[1] : 'md'
  const lang = languages[ext] || ext
  return (
    <AceEditor
      mode={lang}
      width={'100%'}
      theme='monokai'
      name={`file-editor-${name}`}
      // onLoad={this.onLoad}
      onChange={(newValue) => onChange(newValue)}
      fontSize={14}
      showPrintMargin
      // style={{ width: '100%', height: '100%' }}
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
