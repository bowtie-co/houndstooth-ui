import 'jest-enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

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
