/* eslint-env mocha */
/* global expect */
import React from 'react'
import { MemoryRouter as Router } from 'react-router'
import { mount } from 'enzyme'
// import ReactDOM from 'react-dom';

import AppContainer from './AppContainer'

describe('Routes', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <Router>
        <AppContainer />
      </Router>
    )

    expect(wrapper.find(AppContainer).length).toBe(1)
  })
})