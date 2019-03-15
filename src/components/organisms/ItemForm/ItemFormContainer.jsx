
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { ItemForm, EmptyState } from './ItemForm'
import { withFormatting } from 'helpers'

const emptyStateConditionFn = ({ match, activeItem }) => !match.params.item || !activeItem['fields']

export default compose(
  withFormatting,
  withEither(emptyStateConditionFn, EmptyState),
  withStateHandlers({
    fileNameError: '',
    isRenameFile: false
  }, {
    setFileNameError: () => (payload) => ({ fileNameError: payload }),
    setRenameFile: () => (payload) => ({ isRenameFile: payload })
  }),
  withHandlers({
    handleFileNameChange: ({ sanitizeFileName, setFileNameError }) => (value) => {
      const regex = /[|&;$%@"<>()+#,' ']/
      if (regex.test(value)) {
        setFileNameError('* Please avoid using special characters or spaces.')
      }
      return sanitizeFileName(value)
    },
    saveRenameFile: ({ setRenameFile, renameItem }) => () => {
      setRenameFile(false)
      renameItem()
    }
  })
)(ItemForm)
