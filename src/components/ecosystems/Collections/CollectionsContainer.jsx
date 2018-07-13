
import { compose, withStateHandlers, withPropsOnChange, withHandlers, lifecycle } from 'recompose'
import { withMaybe, withEither } from '@bowtie/react-utils'
import Collections from './Collections'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'
import { Loading } from '../../atoms'

const nullConditionFn = ({ collections }) => collections.length === 0
const loadingConditionFn = ({ isCollectionLoading }) => isCollectionLoading

export default compose(
  withMaybe(nullConditionFn),
  withStateHandlers(({ match: { params: { username, repo, collection } } }) => ({
    baseRoute: `/repos/${username}/${repo}/collections/${collection || ''}`,
    items: [],
    defaultFields: {},
    activeItem: {},
    isCollectionLoading: false,
    fileUploads: {},
    stagedFileUploads: []
  }), {
    setBaseRoute: ({ baseRoute }) => (payload) => ({ baseRoute: payload }),
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
    selectItem: ({ history, baseRoute }) => (item) => {
      if (item) {
        history.push(`${baseRoute}/${item['name']}`)
      } else {
        history.push(`${baseRoute}/new`)
      }
    },
    getFileUploads: ({ match, setFileUploads, branch }) => () => {
      // const { username, repo } = match.params
      // api.get(`/repos/${username}/${repo}/files?path=upload&ref=${branch || 'master'}&recursive=true&flatten=true`)
      //   .then(({ data: fileUploads }) => setFileUploads(fileUploads))
      //   .catch(notifier.bad.bind(notifier))
    },
    getItems: ({ baseRoute, match, setItems, setDefaultFields, setCollectionLoading }) => (newCollectionRoute) => {
      const { collection } = match.params
      const route = newCollectionRoute || baseRoute
      if (collection) {
        setCollectionLoading(true)
        api.get(route)
          .then(({ data }) => {
            console.log('data in collections: ', data)
            setItems(data['collection']['items'])
            setDefaultFields({ fields: data['collection']['fields'] })
            setCollectionLoading(false)
          })
      }
    },
    editItem: ({ baseRoute, branch, activeItem, match }) => (formData) => {
      const { item } = match.params
      const message = 'Edit file'
      const route = `${baseRoute}/items/${item}?ref=${branch || 'master'}&sha=${activeItem['sha']}&message=${message}`
      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      return api.put(route, updatedItem)
    },
    createItem: ({ baseRoute, branch, match, activeItem }) => (formData) => {
      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      const message = 'Create file'
      const route = `${baseRoute}/items?ref=${branch || 'master'}&message=${message}`
      console.log('updated item: ', updatedItem)
      console.log('route: ', route)
      return api.post(route, updatedItem)
    },
    createFileUpload: ({ stagedFileUploads, match }) => () => {
      const { username, repo } = match.params
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
      return api.post(`/repos/${username}/${repo}/files/upsert`, body)
    },
    handleMarkdownChange: ({ activeItem, setActiveItem }) => (content) => {
      const updated = Object.assign({}, activeItem, { markdown: content })
      setActiveItem(updated)
    }
  }),
  withPropsOnChange(
    ({ match }, { match: nextMatch }) => match.params.collection !== nextMatch.params.collection,
    ({ match, setBaseRoute, getItems, setActiveItem }) => {
      const { username, repo, collection } = match.params
      const newBaseRoute = `/repos/${username}/${repo}/collections/${collection || ''}`
      setBaseRoute(newBaseRoute)
      setActiveItem({})
      getItems(newBaseRoute)
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
  }
  ),
  withHandlers({
    handleFormSubmit: ({ createItem, editItem, createFileUpload, getItems, getFileUploads, match, setCollectionLoading, setStagedFileUploads }) => (formData) => {
      setCollectionLoading(true)
      if (match['params']['item'] === 'new') {
        createItem(formData)
          .then(notifier.ok.bind(notifier))
          .then(() => getItems())
          .catch(notifier.bad.bind(notifier))
      } else {
        editItem(formData)
          .then(notifier.ok.bind(notifier))
          .then(() => getItems())
          .catch(notifier.bad.bind(notifier))
      }

      // TODO: Improve order of executing upload route & item create to ensure both work?
      createFileUpload()
        .then(notifier.ok.bind(notifier))
        .then(() => {
          getFileUploads()
          setStagedFileUploads([])
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  lifecycle({
    componentWillMount () {
      const { getFileUploads } = this.props
      getFileUploads()
    }
  }),
  withEither(loadingConditionFn, Loading)
)(Collections)
