
import { compose, withStateHandlers, withPropsOnChange, withHandlers } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import Collections from './Collections'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'
import TurndownService from 'turndown'

const turndownService = new TurndownService()

const nullConditionFn = ({ collections }) => collections.length === 0

export default compose(
  withMaybe(nullConditionFn),
  withStateHandlers(({ match:{ params: { username, repo, collection } } }) => ({
    baseRoute: `/repos/${username}/${repo}/collections/${collection ? collection : ''}`,
    items: [],
    defaultFields: {},
    activeItem: {},
    stagedFileUploads: [],
    fileUploads: {}
  }), {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setDefaultFields: ({ defaultFields }) => (payload) => ({ defaultFields: payload }),
    setActiveItem: ({ activeItem }) => (payload) => ({ activeItem: payload }),
    setStagedFileUploads: ({ stagedFileUploads }) => (payload) => ({ stagedFileUploads: payload }),
    setFileUploads: ({ setFileUploads }) => (payload) => ({ setFileUploads: payload })
  }),
  withHandlers({
    editFileName: ({ setActiveItem, activeItem }) => (e) => {
      const editedItem = Object.assign({}, activeItem, { name: e.target.value })
      setActiveItem(editedItem)
    },
    selectItem: ({ history, match, baseRoute }) => (item) => {
      if (item) {
        history.push(`${baseRoute}/${item['name']}`)
      } else {
        history.push(`${baseRoute}/new`)
      }
    },
    // getFileUpload: ({ baseRoute }) => () => {
    //   const baseRoute = `/repos/${username}/${repo}/collections/${collection}`
    //   api.get(route)
    // },
    getItems: ({ baseRoute, setItems, setDefaultFields }) => () => {
      api.get(baseRoute)
        .then(({ data }) => {
          setItems(data['collection']['items'])
          setDefaultFields({ fields: data['collection']['fields'] })
        })
    },
    editItem: ({ baseRoute, branch, activeItem, match }) => (formData) => {
      const { item } = match.params
      const message = 'Edit file'
      const route = `${baseRoute}/items/${item}?ref=${branch || 'master'}&sha=${activeItem['sha']}&message=${message}`
      const updatedItem = Object.assign({}, activeItem, { fields: formData, markdown: activeItem['markdown'] })
      return api.put(route, updatedItem)
    },
    createItem: ({ baseRoute, branch, match, activeItem }) => (formData) => {
      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      const message = 'Create file'
      const route = `${baseRoute}/items?ref=${branch || 'master'}&message=${message}`
      return api.post(route, updatedItem)
    },
    handleMarkdownChange: ({ activeItem, setActiveItem }) => (content) => {
      console.log('original content: ', content)
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
        // TODO: api call to grab file uploads
        api.get()
        setActiveItem(currentItem)
      } else {
        setActiveItem({})
        console.log(`Unable to load item: ${match['params']['item']}`)
      }
    }
  }
  ),
  withHandlers({
    handleFormSubmit: ({ createItem, editItem, getItems, match }) => (formData) => {
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
    }
  })
)(Collections)
