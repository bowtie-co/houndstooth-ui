
import { compose, withStateHandlers, withPropsOnChange, withHandlers } from 'recompose'
import { withMaybe, withEither } from '@bowtie/react-utils'
import Collections from './Collections'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'
import { Loading } from '../../atoms'

import TurndownService from 'turndown'

const turndownService = new TurndownService()

const nullConditionFn = ({ collections }) => collections.length === 0
const loadingConditionFn = ({ isCollectionLoading }) => isCollectionLoading

export default compose(
  withMaybe(nullConditionFn),
  withStateHandlers(({ match }) => ({
    items: [],
    defaultFields: {},
    activeItem: {},
    isCollectionLoading: false
  }), {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setDefaultFields: ({ defaultFields }) => (payload) => ({ defaultFields: payload }),
    setActiveItem: ({ activeItem }) => (payload) => ({ activeItem: payload }),
    setCollectionLoading: ({ isCollectionLoading }) => (payload) => ({ isCollectionLoading: payload })
  }),
  withHandlers({
    editFileName: ({ setActiveItem, activeItem }) => (e) => {
      const editedItem = Object.assign({}, activeItem, { name: e.target.value })
      setActiveItem(editedItem)
    },
    selectItem: ({ history, match }) => (item) => {
      const { username, repo, collection } = match.params
      const baseRoute = `/repos/${username}/${repo}/collections/${collection}`
      if (item) {
        history.push(`${baseRoute}/${item.name}`)
      } else {
        history.push(`${baseRoute}/new`)
      }
    },
    getItems: ({ match, setItems, setDefaultFields, setCollectionLoading }) => () => {
      const { username, repo, collection } = match.params
      if (collection) {
        const route = `/repos/${username}/${repo}/collections/${collection}`
        setCollectionLoading(true)
        api.get(route)
          .then(({ data }) => {
            setItems(data['collection']['items'])
            // TODO: Enable markdown content editing via wysiwyg
            setDefaultFields({ fields: data['collection']['fields'], markdown: '\nmarkdown\n' })
            setCollectionLoading(false)
          })
      }
    },
    editItem: ({ branch, activeItem, match }) => (formData) => {
      const { username, repo, collection, item } = match.params
      const message = 'Edit file'
      const route = `/repos/${username}/${repo}/collections/${collection}/items/${item}?ref=${branch || 'master'}&sha=${activeItem['sha']}&message=${message}`
      const updatedItem = Object.assign({}, activeItem, { fields: formData, markdown: turndownService.turndown(activeItem['markdown']) })
      return api.put(route, updatedItem)
    },
    createItem: ({ branch, match, activeItem }) => (formData) => {
      const { username, repo, collection } = match.params
      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      const message = 'Create file'
      const route = `/repos/${username}/${repo}/collections/${collection}/items?ref=${branch || 'master'}&message=${message}`
      return api.post(route, updatedItem)
    },
    handleMarkdownChange: ({ activeItem, setActiveItem }) => (content) => {
      // if(content){
      console.log('original content: ', content)
      const updated = Object.assign({}, activeItem, { markdown: content })
      setActiveItem(updated)
      // }
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
  }
  ),
  withHandlers({
    handleFormSubmit: ({ createItem, editItem, getItems, match, setCollectionLoading }) => (formData) => {
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
    }
  }),
  withEither(loadingConditionFn, Loading)
)(Collections)
