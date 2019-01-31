
// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.
import { compose, withPropsOnChange } from 'recompose'
import { withRouter } from 'react-router'

export default compose(
  withRouter,
  withPropsOnChange(['match'], ({ match: { params: { username, repo, collection } } }) => ({
    baseApiRoute: `repos/${username}/${repo}`,
    baseRoute: `${username}/${repo}`,
    collectionsApiRoute: `repos/${username}/${repo}/collections/${collection || ''}`,
    collectionsRoute: `${username}/${repo}/collections/${collection || ''}`
  }))
)
