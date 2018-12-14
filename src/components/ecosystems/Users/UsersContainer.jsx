// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import Users from './Users'
import { Loading } from 'atoms'
import { api, notifier } from 'lib'

// conditional functions here:
const loadingConditionFn = ({ isMainLoading, users }) => isMainLoading || users.length <= 0

export const enhance = compose(
  withStateHandlers(({ queryParams, match: { params: { username, repo } } }) => ({
    baseRoute: `repos/${username}/${repo}`,
    users: [],
    pages: {}
  }), {
    setUsers: ({ users }) => (payload) => ({ users: payload }),
    setPages: ({ pages }) => (payload) => ({ pages: payload })
  }),
  withHandlers({
    getUsers: ({ setUsers, setPages, match }) => () => {
      const { username, repo } = match['params']
      api.get(`repos/${username}/${repo}/collaborators`)
        .then(({ data }) => {
          setPages(data['pages'])
          setUsers(data)
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(['match'], ({ getUsers }) => {
    getUsers()
  }),
  withEither(loadingConditionFn, Loading)
)

export default enhance(Users)
