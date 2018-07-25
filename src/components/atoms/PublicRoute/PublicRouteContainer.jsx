// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import PublicRoute from './PublicRoute'
import { compose, withProps } from 'recompose'

export const enhance = compose(
  withProps(({ component, action }) => {
    if (component && action) {
      console.error('Please either pass an action or a component into PublicRoute, not both.')
    }

    const actionAsComponent = () => {
      action()
      return null
    }

    const newComponent = action ? actionAsComponent : component
    return { component: newComponent }
  })
)

export default enhance(PublicRoute)
