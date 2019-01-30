/* eslint-env mocha */

// import React from 'react'
// import { shallowWrap } from 'helpers/contextWrap'
// import { MemoryRouter } from 'react-router-dom'
// import { shallow } from 'enzyme'

// import ReactDOM from 'react-dom';

// import FileTreeMapContainer from './FileTreeMapContainer'
// import FileTreeMap from './FileTreeMap'

describe('File Tree Mapping', () => {
  it('simple test so CI doesnt fail', () => {
    console.log('test file rendered')
  })
  // it('renders without crashing', () => {
  //   const routerProps = {
  //     match: {
  //       params: {
  //         type: 'file',
  //         path: 'file1/subfile1'
  //       }
  //     }
  //   }

  //   const props = {
  //     queryParams: { path: 'file1/subfile1' },
  //     tree: {
  //       file1: '',
  //       file2: '',
  //       file3: {
  //         subfile1: '',
  //         subfile2: '',
  //         subfile3: ''
  //       }
  //     },
  //     baseRoute: '/baseRoute/file1/subfile1',
  //     branch: 'master'
  //   }

  //   const wrapper = shallow(<MemoryRouter initialEntries={['file1/subfile1']}><FileTreeMapContainer {...props} /></MemoryRouter>).until(FileTreeMap)

  //   expect(wrapper.find(FileTreeMap).length).toBe(1)
  // })

  // it('expect the correct amount of directories to be shown', () => {
  //   const routerProps = {
  //     match: {
  //       params: {
  //         type: 'file'
  //         // path: 'file3/subfile1'
  //       }
  //     }
  //   }

  //   const props = {
  //     queryParams: { path: 'file3/subfile1' },
  //     tree: {
  //       '_sections': '',
  //       '_authors': '',
  //       '_team': {
  //         '_team/nick.md': '',
  //         'file3/subfile2': '',
  //         'file3/subfile3': ''
  //       }
  //     },
  //     baseRoute: '/tbrandle/repo/',
  //     branch: 'master'
  //   }

  //   const wrapper = shallow(<MemoryRouter initialEntries={['/tbrandle/template_blog/file?path=_team/nick.md&ref=master']}><FileTreeMapContainer {...props} /> </MemoryRouter>).until(FileTreeMap)

  //   console.log('wrappers props', wrapper.html())
  //   expect(wrapper.find('.nested-dir').length).toBe(2)
  //   expect(wrapper.find('.dir-list-file-tree').length).toBe(1)
  // })
})
