
import { compose, withStateHandlers, withPropsOnChange } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import Collections from './Collections'
import api from '../../../lib/api'

const nullConditionFn = ({ collections }) => collections.length === 0

export default compose(
  withMaybe(nullConditionFn),
  withStateHandlers({
    items: [],
    fields: {},
    activeItem: {}
  }, {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setFields: ({ fields }) => (payload) => ({ fields: payload }),
    setActiveItem: ({ activeItem }) => (payload) => ({ activeItem: payload })
  }),
  withPropsOnChange(
    ({ match }, { match: nextMatch }) => match.params.collection !== nextMatch.params.collection,
    ({ match, setItems, setFields }) => {
      const { collection, username, repo } = match.params
      if (collection) {
        const route = `/repos/${username}/${repo}/collections/${collection}`
        api.get(route)
          .then(({ data }) => {
            setItems(data['collection']['items'])
            setFields(data['collection']['fields'])
          })
      }
      console.log('Collection ', collection)
    })
)(Collections)
