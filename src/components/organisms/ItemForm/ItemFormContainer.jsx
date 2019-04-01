
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
    isRenameFile: false,
    isNameModalOpen: false
  }, {
    toggleNameModal: ({ isNameModalOpen }) => (payload = null) => ({ isNameModalOpen: payload === null ? !isNameModalOpen : payload }),
    setFileNameError: () => (payload) => ({ fileNameError: payload }),
    setRenameFile: () => (payload) => ({ isRenameFile: payload })
  }),
  withHandlers({
    handleFileNameChange: ({ sanitizeFileName, setFileNameError }) => (value) => {
      const regex = /[|&;$%@"<>()+#,' ']/
      if (regex.test(value)) {
        setFileNameError('* Please avoid using special characters or spaces.')
      } else if (!value) {
        setFileNameError('* A file name is required.')
      }
      return sanitizeFileName(value)
    },
    cancelRename: ({ toggleNameModal, setRenameFile, match, editFileName }) => () => {
      editFileName({ target: { value: match['params']['item'] } })
      toggleNameModal(false)
      setRenameFile(false)
    },
    saveRenameFile: ({ setRenameFile, renameItem, getItems, activeItem, toggleNameModal, branch, history, collectionsRoute, setCollectionLoading }) => () => {
      setRenameFile(false)
      toggleNameModal()
      setCollectionLoading(true)

      renameItem()
        .then(resp => {
          getItems()
          history.push(`/${collectionsRoute}/${activeItem['name']}?ref=${branch}`)
        })
    }
  }),
  withHandlers({
    openModal: ({ toggleNameModal, cancelRename, editFileName, setRenameFile, match }) => (e) => {
      const { value } = e.target
      value.trim() !== ''
        ? toggleNameModal()
        : cancelRename()
    }
  })
)(ItemForm)
