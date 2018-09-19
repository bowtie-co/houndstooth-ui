/* global FileReader */

import { compose, withHandlers, withState } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { notifier } from 'lib'
import ImageUpload from './ImageUpload'
import EmptyState from './EmptyState'

const emptyStateConditionalFn = ({ value }) => !value

export default compose(
  withState('preview', 'togglePreview', false),
  withHandlers({
    handleFileDrop: ({ name, onChange, togglePreview }) => (accepted, rejected) => {
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
        togglePreview(true)
      })
    },
    handleCancelPreview: ({ onChange, name, togglePreview }) => (e) => {
      e.preventDefault()
      onChange({ target: { name, value: null, revert: true } })
      togglePreview(false)
    },
    deleteImage: ({ onChange, name }) => (e) => {
      e.preventDefault()
      onChange({ target: { name, value: null } })
    }
  }),
  withEither(emptyStateConditionalFn, EmptyState)
)(ImageUpload)
