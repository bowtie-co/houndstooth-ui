
import { compose, withStateHandlers, withPropsOnChange, withHandlers } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import Collections from './Collections'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

const nullConditionFn = ({ collections }) => collections.length === 0

export default compose(
  withMaybe(nullConditionFn),
  withStateHandlers({
    items: [],
    defaultFields: {},
    activeItem: {}
  }, {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setDefaultFields: ({ defaultFields }) => (payload) => ({ defaultFields: payload }),
    setActiveItem: ({ activeItem }, { history }) => (payload) => ({ activeItem: payload })
  }),
  withHandlers({
    selectItem: ({ setActiveItem, history, match }) => (item) => {
      if (item) {
        setActiveItem(item)
        history.push(`${match['url']}/${item.name}`)
      } else {
        setActiveItem({})
        history.push(`${match['url']}/new`)
      }
    },
    getItems: ({ match, setItems, setDefaultFields }) => () => {
      const { username, repo, collection } = match.params
      if (collection) {
        const route = `/repos/${username}/${repo}/collections/${collection}`
        api.get(route)
          .then(({ data }) => {
            setItems(data['collection']['items'])
            setDefaultFields(data['collection']['fields'])
          })
      }
    },
    editItem: ({ branch, activeItem, match, queryParams }) => (formData) => {
      const { username, repo, collection } = match.params

      const message = 'Edit file'
      const route = `/repos/${username}/${repo}/collections/${collection}/items/${queryParams['file']}?ref=${branch || 'master'}&sha=${activeItem['sha']}&message=${message}`
      const updatedItem = Object.assign({}, activeItem, { fields: formData })

      return api.put(route, updatedItem)
    },
    createItem: ({ branch, match }) => (formData) => {
      const { username, repo, collection } = match.params

      const message = 'Create file'
      const route = `/repos/${username}/${repo}/collections/${collection}/items/?ref=${branch || 'master'}&message=${message}`
      return api.post(route, formData)
    }
  }),
  withPropsOnChange(
    ({ match }, { match: nextMatch }) => match.params.collection !== nextMatch.params.collection,
    ({ getItems, setActiveItem }) => {
      setActiveItem({})
      getItems()
    }
  ),
  withHandlers({
    formSubmit: ({ activeItem, createItem, editItem, getItems }) => (formData) => {
      if (activeItem['fields']) {
        editItem(formData)
          .then(notifier.ok.bind(notifier))
          .then(() => getItems())
          .catch(notifier.bad.bind(notifier))
      } else {
        createItem(formData)
          .then(notifier.ok.bind(notifier))
          .then(() => getItems())
          .catch(notifier.bad.bind(notifier))
      }
    }
  })
)(Collections)
