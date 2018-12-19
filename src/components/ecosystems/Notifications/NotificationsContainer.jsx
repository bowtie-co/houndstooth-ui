/* eslint-disable camelcase */

// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose, withState, lifecycle, withHandlers, withPropsOnChange } from 'recompose'
import Notifications from './Notifications'
import { notifier } from 'lib'

export default compose(
  withState('messages', 'setMessages', () => notifier.load()),
  withHandlers({
    loadMessages: ({ setMessages }) => () => {
      setMessages(notifier.load())
    },
    handleDismiss: ({ setMessages }) => (msg) => {
      notifier.clearMsg(msg)
    }
  }),
  lifecycle({
    componentDidMount () {
      const { loadMessages } = this.props

      notifier.on('change', loadMessages)
    },
    componentWillUnmount () {
      const { loadMessages } = this.props

      notifier.off('change', loadMessages)
    }
  }),
  withPropsOnChange([ 'messages' ], ({ messages }) => {
    messages.forEach(notifier.readMsg.bind(notifier))
  })
)(Notifications)
