
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
    setActiveItem: ({ activeItem }, { history }) => (payload) => {
      const searchParam = payload.name ? `?file=${payload.name}` : `?file=new_item&create=true`
      history.push({ search: searchParam })
      return { activeItem: payload }
    }
  }),
  withPropsOnChange(
    ({ match }, { match: nextMatch }) => match.params.collection !== nextMatch.params.collection,
    ({ match, setItems, setDefaultFields }) => {
      const { collection, username, repo } = match.params
      if (collection) {
        const route = `/repos/${username}/${repo}/collections/${collection}`
        api.get(route)
          .then(({ data }) => {
            setItems(data['collection']['items'])
            setDefaultFields(data['collection']['fields'])
          })
      }
      console.log('Collection ', collection)
    }),
  withHandlers({
    editItem: ({ branch, activeItem, match, queryParams }) => (formData) => {
      const { username, repo, collection } = match.params

      const message = 'Edit file'
      const route = `/repos/${username}/${repo}/collections/${collection}/items/${queryParams['file']}?ref=${branch || 'master'}&sha=${activeItem['sha']}&message=${message}`
      const updatedItem = Object.assign({}, activeItem, { fields: formData })

      api.put(route, updatedItem)
        .then(notifier.ok.bind(notifier))
        .catch(notifier.bad.bind(notifier))
    },
    createItem: ({ branch, match }) => (formData) => {
      const { username, repo, collection } = match.params

      const message = 'Create file'
      const route = `/repos/${username}/${repo}/collections/${collection}/items/?ref=${branch || 'master'}&message=${message}`
      api.post(route, formData)
        .then(notifier.ok.bind(notifier))
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withHandlers({
    formSubmit: ({ queryParams, createItem, editItem }) => (formData) => {
      queryParams['create']
        ? createItem(formData)
        : editItem(formData)
    }
  })
)(Collections)
