// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import Users from './Users'
import { api, notifier } from 'lib'

export const enhance = compose(
  withStateHandlers({
    contributors: [], // users that have NOT committed code to the repo
    collaboratorIds: [], // user that HAVE committed code to repo
    pages: {}
  }, {
    setContributors: () => (payload) => ({ contributors: payload }),
    setCollaboratorIds: () => (payload) => ({ collaboratorIds: payload }),
    setPages: () => (payload) => ({ pages: payload })
  }),
  withHandlers({
    getContributors: ({ setContributors, setPages, baseApiRoute, match }) => () => {
      api.get(`${baseApiRoute}/contributors?per_page=100`)
        .then(({ data }) => {
          setContributors(data['contributors'])
        })
        .catch(notifier.bad.bind(notifier))
    },
    getCollaborators: ({ setCollaboratorIds, setPages, baseApiRoute, match }) => () => {
      api.get(`${baseApiRoute}/collaborators?per_page=100`)
        .then(({ data }) => {
          setCollaboratorIds(data['collaborators'].map(u => u['id']))
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(
    ({ match }, { match: nextMatch }) => match.params['repo'] !== nextMatch.params['repo'],
    ({ getContributors, getCollaborators }) => {
      getContributors()
      getCollaborators()
    })
)

export default enhance(Users)
