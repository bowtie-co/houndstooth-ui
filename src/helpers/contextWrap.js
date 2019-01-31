import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import deepMerge from 'deepmerge'

import { shape } from 'prop-types'

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {
      params: {}
    }
  }
}

const createContext = (routerProps = {}) => ({
  context: deepMerge({ router }, { router: { route: routerProps } }),
  childContextTypes: { router: shape({}) }
})

export function mountWrap (node, routerProps = {}) {
  return mount(node, createContext(routerProps))
}

export function shallowWrap (node, routerProps = {}) {
  return shallow(node, createContext(routerProps))
}
