
import { compose, withStateHandlers, withPropsOnChange, withHandlers, lifecycle } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import { Collections, EmptyState, EmptyItem } from './Collections'
import { api, notifier } from 'lib'
import { Loading } from 'atoms'

const nullConditionFn = ({ collections }) => !collections
const emptyStateConditionFn = ({ collections }) => collections.length === 0
const emptyItemConditionFn = ({ collections, match }) => collections.length > 0 && !match.params['collection']
const isCollectionLoadingConditionFn = ({ isCollectionLoading }) => isCollectionLoading

export default compose(
  withStateHandlers({
    items: [],
    defaultFields: {},
    activeItem: {},
    isCollectionLoading: false,
    fileUploads: {},
    stagedFileUploads: []
  }, {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setDefaultFields: ({ defaultFields }) => (payload) => ({ defaultFields: payload }),
    setActiveItem: ({ activeItem }) => (payload) => ({ activeItem: payload }),
    setCollectionLoading: ({ isCollectionLoading }) => (payload) => ({ isCollectionLoading: payload }),
    setFileUploads: ({ fileUploads }) => (payload) => ({ fileUploads: payload }),
    setStagedFileUploads: ({ stagedFileUploads }) => (payload) => ({ stagedFileUploads: payload })
  }),
  withHandlers({
    editFileName: ({ setActiveItem, activeItem }) => (e) => {
      const editedItem = Object.assign({}, activeItem, { name: e.target.value })
      setActiveItem(editedItem)
    },
    selectItem: ({ history, baseRoute, match, branch }) => (itemName) => {
      if (itemName) {
        const { collection } = match.params
        history.push(`/${baseRoute}/collections/${collection || ''}/${itemName}?path=_${collection}/${itemName}&ref=${branch}`)
      }
    },
    getFileUploads: ({ match, setFileUploads, branch }) => () => {
      // const { username, repo } = match.params
      // api.get(`${baseApiRoute}/files?path=upload&ref=${branch || 'master'}&recursive=true&flatten=true`)
      //   .then(({ data: fileUploads }) => setFileUploads(fileUploads))
      //   .catch(notifier.bad.bind(notifier))
    },
    getItems: ({ collectionsApiRoute, match, setItems, setDefaultFields, setCollectionLoading }) => () => {
      const { collection } = match.params
      if (collection) {
        setCollectionLoading(true)
        api.get(collectionsApiRoute)
          .then(({ data }) => {
            console.log('data in collections: ', data)
            setItems(data['collection']['items'])
            setDefaultFields({ fields: data['collection']['fields'] })
            setCollectionLoading(false)
          })
          .catch((resp) => {
            setCollectionLoading(false)
            notifier.bad(resp)
          })
      }
    },
    editItem: ({ collectionsApiRoute, branch, activeItem, match }) => (formData) => {
      const { item } = match.params
      const message = 'Edit file'
      const route = `${collectionsApiRoute}/items/${item}?ref=${branch || 'master'}&sha=${activeItem['sha']}&message=${message}`
      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      return api.put(route, updatedItem)
    },
    createItem: ({ collectionsApiRoute, branch, match, activeItem }) => (formData) => {
      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      const message = 'Create file'
      const route = `${collectionsApiRoute}/items?ref=${branch || 'master'}&message=${message}`
      console.log('updated item: ', updatedItem)
      console.log('route: ', route)
      return api.post(route, updatedItem)
    },
    createFileUpload: ({ stagedFileUploads, baseApiRoute }) => () => {
      const newFiles = stagedFileUploads.map(file => {
        const updatedFile = {
          path: file.name,
          content: file.base64.split('base64,')[1],
          encoding: 'base64'
        }
        return updatedFile
      })

      const body = {
        files: newFiles,
        message: 'File Upload'
      }
      return api.post(`${baseApiRoute}/files/upsert`, body)
    },
    handleMarkdownChange: ({ activeItem, setActiveItem }) => (content) => {
      const updated = Object.assign({}, activeItem, { markdown: content })
      setActiveItem(updated)
    }
  }),
  withPropsOnChange(
    ({ match }, { match: nextMatch }) => match.params.collection !== nextMatch.params.collection,
    ({ getItems, setActiveItem }) => {
      setActiveItem({})
      getItems()
    }
  ),
  withPropsOnChange([ 'match', 'items', 'defaultFields' ], ({ match, items, setActiveItem, defaultFields }) => {
    if (match['params']['item'] === 'new') {
      setActiveItem(defaultFields)
    } else {
      console.log('finding item', match['params']['item'], items)
      const currentItem = items.find(i => i.name === match['params']['item'])

      if (currentItem) {
        setActiveItem(currentItem)
      } else {
        setActiveItem({})
        console.log(`Unable to load item: ${match['params']['item']}`)
      }
    }
  }),
  withHandlers({
    handleFormSubmit: ({ collectionsApiRoute, items, createItem, history, editItem, createFileUpload, getItems, getFileUploads, match, setCollectionLoading, setStagedFileUploads }) => (formData) => {
      setCollectionLoading(true)
      if (match['params']['item'] === 'new') {
        createItem(formData)
          .then(resp => {
            notifier.success('Item created successfully!')
          })
          .then(({ data }) => {
            if (items[0]['name'] === 'NEW FILE') {
              items.shift()
            }
            getItems()
            history.push(`${collectionsApiRoute}/${data.data.content['name']}`)
          })
          .catch((resp) => {
            setCollectionLoading(false)
            notifier.bad(resp)
          })
      } else {
        editItem(formData)
          .then(resp => {
            notifier.success('Item updated successfully!')
          })
          .then(() => getItems())
          .catch((resp) => {
            setCollectionLoading(false)
            notifier.bad(resp)
          })
      }

      // TODO: Improve order of executing upload route & item create to ensure both work?
      createFileUpload()
        .then(resp => {
          notifier.success('File upload successful!')
        })
        .then(() => {
          getFileUploads()
          setStagedFileUploads([])
        })
        .catch((resp) => {
          setCollectionLoading(false)
          notifier.bad(resp)
        })
    },
    deleteItem: ({ collectionsApiRoute, branch, match, history, activeItem, getItems }) => () => {
      const { item } = match.params
      const { sha } = activeItem
      const message = 'Delete file'
      const route = `${collectionsApiRoute}/items/${item}?ref=${branch || 'master'}&message=${message}&sha=${sha}`
      console.log('route: ', route)
      api.delete(route)
        .then(resp => {
          getItems()
          notifier.success('Item deleted!')

          history.push(collectionsApiRoute)
        })
        .catch((resp) => {
          notifier.bad(resp)
        })
    }
  }),
  lifecycle({
    componentWillMount () {
      const { getFileUploads } = this.props
      getFileUploads()
    }
  }),
  withMaybe(nullConditionFn),
  withEither(emptyStateConditionFn, EmptyState),
  withEither(emptyItemConditionFn, EmptyItem),
  withEither(isCollectionLoadingConditionFn, Loading)
)(Collections)
