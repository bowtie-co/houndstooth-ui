// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import Users from './Users'
import { notifier } from 'lib'
import { github } from 'lib/index'

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
    getContributors: ({ buildSdkParams, setContributors, baseApiRoute }) => () => {
      const params = buildSdkParams({ 'per_page': '100' })
      github.contributors(params)
        .then(({ contributors }) => setContributors(contributors))
        .catch(notifier.bad.bind(notifier))
    },
    getCollaborators: ({ buildSdkParams, setCollaboratorIds, setPages, baseApiRoute, permissions }) => () => {
      if (permissions['push']) {
        const params = buildSdkParams({ 'per_page': '100' })
        github.collaborators(params)
          .then(({ collaborators }) => setCollaboratorIds(collaborators.map(u => u['id'])))
          .catch(notifier.bad.bind(notifier))
      }
    }
  }),
  withPropsOnChange(
    ({ match }, { match: nextMatch }) => match.params['repo'] !== nextMatch.params['repo'],
    ({ getContributors, getCollaborators, permissions }) => {
      getContributors()
      permissions['push'] && getCollaborators()
    })
)

export default enhance(Users)
