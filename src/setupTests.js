import 'jest-enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ShallowWrapper from 'enzyme/ShallowWrapper'
import until from 'enzyme-shallow-until'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
// require('../config/env')

configure({ adapter: new Adapter() })

// This allows jest testing to find the Base Component in a HOC.
ShallowWrapper.prototype.until = until

function storageMock () {
  var storage = {}

  return {
    setItem: function (key, value) {
      storage[key] = value || ''
    },
    getItem: function (key) {
      return key in storage ? storage[key] : null
    },
    removeItem: function (key) {
      delete storage[key]
    },
    get length () {
      return Object.keys(storage).length
    },
    key: function (i) {
      var keys = Object.keys(storage)
      return keys[i] || null
    }
  }
}

// mock the localStorage
window.localStorage = storageMock()
// mock the sessionStorage
window.sessionStorage = storageMock()
