/* global FileReader */

import { withRouter } from 'react-router'
import { compose, withHandlers, withState, withPropsOnChange } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import DocumentPreview from './DocumentPreview'
import DocumentUpload from './DocumentUpload'
import notifier from '../../../lib/notifier'

// conditional functions here:
const nullConditionFn = (props) => !props
const showDocPreviewConditionFn = (props) => props.preview || props.previewOnly

export default compose(
  withRouter,
  withMaybe(nullConditionFn),
  withState('numPages', 'setNumPages', null),
  withState('pageNumber', 'setPageNumber', 1),
  withState('preview', 'setPreview', false),
  withPropsOnChange([ 'value' ], ({ value, setPreview }) => {
    if (value) {
      setPreview(true)
    }
  }),
  withHandlers({
    togglePreview: ({ preview, setPreview }) => (e) => {
      e.preventDefault()
      e.stopPropagation()

      setPreview(!preview)
    },
    customTextRenderer: (props) => (item) => {
      console.log('customTextRenderer', item)
    },
    handleTextLoaded: ({ onTextLoaded }) => () => {
      if (typeof onTextLoaded === 'function') {
        onTextLoaded()
      }
    },
    handlePage: ({ setPageNumber, numPages }) => (page) => {
      if (page > 0 && page <= numPages) {
        setPageNumber(page)
      } else {
        console.warn('Attempting to set page beyond bounds! page=', page, 'numPages=', numPages)
      }
    },
    handleDocumentLoad: ({ setNumPages }) => ({ numPages }) => {
      setNumPages(numPages)
    },
    handleButtonClick: () => (e, ref) => {
      e.stopPropagation()
      ref && ref.open()
    },
    handleFileDrop: ({ name, onChange }) => (accepted, rejected) => {
      rejected.forEach(file => {
        if (file.size > (5 * 1024 * 1024)) {
          notifier.error(`File: ${file.name} is too large. Must be less than 5MB.`)
        } else {
          notifier.error(`File: ${file.name} is invalid.`)
        }
      })

      accepted.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          const documentBase64 = reader.result
          onChange({ target: { name, value: documentBase64 } })
        }

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')

        reader.readAsDataURL(file)
      })
    }
  }),
  withEither(showDocPreviewConditionFn, DocumentPreview)
)(DocumentUpload)
