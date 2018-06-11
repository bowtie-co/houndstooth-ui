import EventEmitter from 'eventemitter2'
import uuid from 'uuid/v1'
import { setTimeout } from 'timers'
import PubNub from 'pubnub'
import storage from './storage'
import { titleize } from '@bowtie/utils'

class Notifier extends EventEmitter {
  constructor () {
    super()

    this.msgs = []
    this.user = storage.get('current_user')
    this.timeout = 4000
    this.channels = {}

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
  }

  userChange (user) {
    if (user.channels && JSON.stringify(this.channels) !== JSON.stringify(user.channels)) {
      if (this.pubnub) this.pubnub.stop()
      this.user = user
      setTimeout(() => { this.init() }, 500)
    }
  }

  init () {
    if (this.user) {
      this.channels = this.user.channels
      this.authorize()
      this.subscribe()
    } else {
      // NO USER TO INIT NOTIFIER PUBNUB
      // console.warn('NO USER TO INIT NOTIFIER PUBNUB')
    }
  }

  handleMessage (message) {
    // handle message
    // var channelName = message.channel; // The channel for which the message belongs
    // var channelGroup = message.subscription; // The channel group or wildcard subscription match (if exists)
    // var pubTT = message.timetoken; // Publish timetoken
    // var msg = message.message; // The Payload
    console.log('NOTIFIER RECEIVED MESSAGE:', message)

    this.emit(message.channel, message)

    // if (message.message.body) {
    //   this.msg(message.message.body, message.message.type)
    // }

    if (message.message.conn_update) {
      let changes = storage.get('current_user')
      changes.channels = message.message.channels
      storage.set('current_user', changes)
    }
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
    this.pubnub = new PubNub({
      publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
      subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
      authKey: this.user.auth_key,
      ssl: true
    })
    // this.subscribe()
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

    this.listen()
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

      if (this.msgs.length > 0) {
        setTimeout(this.reset.bind(this), this.timeout)
      }
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

    this.msgs.push({
      id,
      body,
      type,
      color
    })

    this.save()
  }

  ok (resp) {
    if (resp.data && resp.data.message) {
      this.success(resp.data.message)
    }

    return Promise.resolve(resp)
  }

  bad (resp) {
    this.parseErrors(resp.data || resp)

    return Promise.resolve(resp)
  }

  apiErrors (resp, handler) {
    if (!resp.data) return

    let { message, errors } = resp.data

    if (errors) {
      message = Object.keys(errors).map(err => {
        const msg = errors[err]

        return `${titleize(err, '_')} ${msg}`
      }).join(`\n`)
    }

    if (message) {
      this.error(message)
    }

    if (errors && typeof handler === 'function') {
      handler(errors)
    }
  }

  parseErrors (data) {
    const errors = data.errors || data.error

    if (data.message) {
      this.error(data.message)
    }

    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach(notifier.error)
      } else if (errors.message) {
        this.error(errors.message)
      } else if (typeof errors === 'object') {
        Object.keys(errors).forEach(key => {
          const msg = errors[key]

          this.error(`[${key}] ${msg}`)
        })
      } else {
        this.error(JSON.stringify(errors))
      }
    }
  }
}

const notifier = new Notifier()

export default notifier
