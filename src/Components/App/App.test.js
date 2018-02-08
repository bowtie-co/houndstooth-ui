import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import ComponentOneContainer from '../ComponentOne/ComponentOneContainer';
import Loading from '../Loading/Loading';
import { MemoryRouter as Router } from 'react-router';

import { mount, shallow } from 'enzyme';

// const WrappedComponent = withRouter(App)

const featureList = [
  'recompose',
  'css modules',
  'scss loaders',
  'Bowtie React utilities',
  'Bowtie React file structure',
  'jest-enzyme library'
]
it('renders without crashing', () => {
  const wrapper = mount(
    <Router>
      <AppContainer featureList={featureList} />
    </Router>
  )

  console.log(wrapper)
  expect(wrapper).toBePresent()
});

it('App renders child components', () => {

  const wrapper = mount(
    <Router>
      <AppContainer featureList={featureList} />
    </Router>
  )

  expect(wrapper).toContainReact(<ComponentOneContainer />);
});

it('App renders Loading component if isLoading is true', () => {

  const wrapper = mount(
    <Router>
      <AppContainer featureList={featureList} isLoading={true} />
    </Router>
  )
  console.log(wrapper);
  
  expect(wrapper.find(Loading)).toBePresent();
});

it('App does not render Loading component if isLoading is false', () => {

  const wrapper = mount(
    <Router>
      <AppContainer featureList={featureList} isLoading={false} />
    </Router>
  )
  console.log(wrapper);
  
  expect(wrapper.find(Loading)).toBeEmpty();
});

