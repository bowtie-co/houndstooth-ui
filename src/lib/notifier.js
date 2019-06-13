import EventEmitter from 'eventemitter2'
import uuid from 'uuid/v1'
import { setTimeout } from 'timers'
import PubNub from 'pubnub'
import storage from './storage'

class Notifier extends EventEmitter {
  constructor () {
    super()

    this.msgs = []
    this.user = storage.get('current_user')
    this.timeout = 10000
    this.channels = {
      ro: [
        'repos.*'
      ]
    }

    const types = [
      'error',
      'warning',
      'alert',
      'notice',
      'info',
      'success'
    ]

    this.colorMap = {
      error: 'danger',
      alert: 'primary',
      notice: 'secondary'
    }

    types.forEach(t => {
      this[t] = (body) => {
        this.msg(body, t)
      }
    })

    this.init()

    storage.on('current_user_changed', this.userChange.bind(this))
    storage.on('clear', this.userChange.bind(this))
  }

  userChange (user) {
    if (!this.user || !user) {
      this.resetPubnub()
    }

    this.user = user
    this.init()
  }

  init () {
    if (!this.pubnub) this.resetPubnub()

    if (this.user) {
      if (this.user.channels && JSON.stringify(this.channels) !== JSON.stringify(this.user.channels)) {
        this.channels = this.user.channels
        this.subscribe()
      }
    } else {
      // NO USER TO INIT NOTIFIER PUBNUB
      // console.warn('NO USER TO INIT NOTIFIER PUBNUB')
    }
  }

  resetPubnub () {
    this.channels = {}
    if (this.pubnub) this.pubnub.destroy()
    if (this.user) {
      this.authorize()
      this.listen()
    }
  }

  handleMessage (message) {
    // handle message
    // var channelName = message.channel; // The channel for which the message belongs
    // var channelGroup = message.subscription; // The channel group or wildcard subscription match (if exists)
    // var pubTT = message.timetoken; // Publish timetoken
    // var msg = message.message; // The Payload
    console.log('NOTIFIER RECEIVED MESSAGE:', message)

    const { body, type } = message.message

    if (body && type) {
      this.msg(body, type)
    }

    this.emit(message.channel, message)
  }

  handlePresence (presence) {
    // handle presence
    // var action = presence.action; // Can be join, leave, state-change or timeout
    // var channelName = presence.channel; // The channel for which the message belongs
    // var occupancy = presence.occupancy; // No. of users connected with the channel
    // var state = presence.state; // User State
    // var channelGroup = presence.subscription; //  The channel group or wildcard subscription match (if exists)
    // var publishTime = presence.timestamp; // Publish timetoken
    // var timetoken = presence.timetoken;  // Current timetoken
    // var uuid = presence.uuid; // UUIDs of users who are connected with the channel
  }

  handleStatus (status) {
    console.log(status)
    // var affectedChannelGroups = status.affectedChannelGroups;
    // var affectedChannels = status.affectedChannels;
    // var category = status.category;
    // var operation = status.operation;
    // if (status.statusCode === 403 && status.operation === 'PNSubscribeOperation') {
    //   this.pubnub.stop()
    //   storage.clear()
    //   window.location.reload()
    // }
  }

  authorize () {
    if (process.env.REACT_APP_PUBNUB_PUBLISH_KEY && process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY) {
      this.pubnub = new PubNub({
        publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
        authKey: process.env.REACT_APP_PUBNUB_AUTH_KEY,
        ssl: true
      })
    }
  }

  listen () {
    this.pubnub.addListener({
      message: this.handleMessage.bind(this),
      presence: this.handlePresence.bind(this),
      status: this.handleStatus.bind(this)
    })
  }

  readChannels () {
    const readOnlyChannels = this.channels['ro'] || []
    const readWriteChannels = this.channels['rw'] || []

    return readOnlyChannels.concat(readWriteChannels)
  }

  subscribe () {
    this.pubnub.subscribe({
      channels: this.readChannels()
    })
  }

  unsubscribe () {
    if (!this.pubnub) return

    this.pubnub.unsubscribe({
      channels: this.readChannels()
    })
  }

  publish (channel, message) {
    return this.pubnub.publish({
      message,
      channel
    })
  }

  pnHistory (channel, count = 30) {
    return this.pubnub.history({
      channel,
      count
    })
  }

  load () {
    const saved = storage.get('messages')

    if (Array.isArray(saved)) {
      this.msgs = saved
    } else {
      console.warn('Bad saved messages format', saved)
    }

    return this.msgs
  }

  reset () {
    this.msgs = []
    this.save()
  }

  save () {
    storage.set('messages', this.msgs)
    this.emit('change', this.msgs)
  }

  msg (body, type = 'info') {
    this.load()

    const id = uuid()

    const color = this.colorMap[type] || type

    const msg = {
      id,
      body,
      type,
      color
    }

    this.msgs.push(msg)

    this.save()
  }

  clearMsg (msg) {
    const msgIndex = this.msgs.findIndex(m => m.id === msg.id)

    if (msgIndex >= 0) {
      this.msgs.splice(msgIndex, 1)
      this.save()
    } else {
      console.log('Cannot clear unknown msg', msg)
    }
  }

  readMsg (msg) {
    setTimeout(() => {
      this.clearMsg(msg)
    }, this.timeout)
  }

  ok (resp) {
    const { data } = resp

    if (data && data.message) {
      this.success(data.message)
    }

    return Promise.resolve(resp)
  }

  bad (resp) {
    const { data, message } = resp

    if (message) {
      this.error(message)
    } else if (data && data.message) {
      this.error(data.message)
    }

    return Promise.resolve(resp)
  }
}

const notifier = new Notifier()

export default notifier
