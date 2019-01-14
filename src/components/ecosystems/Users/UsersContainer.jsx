// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import Users from './Users'
import { api, notifier } from 'lib'

export const enhance = compose(
  withStateHandlers({
    users: [],
    pages: {}
  }, {
    setUsers: ({ users }) => (payload) => ({ users: payload }),
    setPages: ({ pages }) => (payload) => ({ pages: payload })
  }),
  withHandlers({
    getUsers: ({ setUsers, setPages, baseApiRoute, match }) => () => {
      api.get(`${baseApiRoute}/contributors`)
        .then(({ data }) => {
          setPages(data['pages'])
          setUsers(data['contributors'])
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(['match'], ({ getUsers }) => {
    getUsers()
  })
)

export default enhance(Users)
