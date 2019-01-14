import React from 'react'
import { Alert } from 'reactstrap'

const Notifications = ({ messages, handleDismiss }) => {
  return (
    <div className={`notifications`}>
      {messages.map(msg =>
        <Alert key={msg.id} color={msg.color} type={msg.type} isOpen toggle={() => handleDismiss(msg)} className={`${msg.type} pre-wrap`}>
          {msg.body}
        </Alert>
      )}
    </div>
  )
}

export default Notifications
