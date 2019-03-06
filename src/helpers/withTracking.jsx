
import { withRouter } from 'react-router'
import { compose, withHandlers } from 'recompose'

export default compose(
  withRouter,
  withHandlers({
    onClickButtonWithTracking: ({ onClick, children, label, location, match, gaParams = {} }) => (e) => {
      let btnName

      if (children) {
        btnName = Array.isArray(children) ? children.find(child => typeof child === 'string') : children
      }

      const {
        action = 'Button Click',
        category = location['pathname'],
        label = btnName
      } = gaParams

      window.gtag('event', action, {
        'event_category': category,
        'event_label': label
      })

      onClick && onClick(e)
    },
    onClickExtLinkWithTracking: ({ onClick, href, children, label, location, match, gaParams = {} }) => (e) => {
      const {
        action = 'Ext Link Click',
        category = location['pathname'],
        label = href
      } = gaParams

      window.gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'transport_type': 'beacon'
      })

      onClick && onClick(e)
    },
    onPageViewTracking: ({ location }) => (gaParams = {}) => {
      const {
        action = 'Impression',
        category = location['pathname'],
        label = 'Directory View'
      } = gaParams

      window.gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'transport_type': 'beacon'
      })
    }
  })
)
