/* global alert  */

import { compose, withStateHandlers, withHandlers, withPropsOnChange, lifecycle } from 'recompose'
import Repo from './Repo'
import qs from 'qs'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

// conditional functions here:

export const enhance = compose(
  withStateHandlers(({ queryParams }) => ({
    dirList: [],
    file: {},
    isComponentLoading: false
  }), {
    setDirList: ({ dirList }) => (payload) => ({ dirList: payload }),
    setFile: ({ file }) => (payload) => ({ file: payload })
  }),
  withHandlers({
    saveFile: ({ setFile, file, stagedFiles, setStagedFiles, queryParams }) => (content) => {
      const newFile = Object.assign({}, file, { content })
      const filePath = queryParams['path']

      const shouldUpdateStaged = stagedFiles.some(file => file.name === filePath)

      const newState = shouldUpdateStaged
        ? stagedFiles.map(file => file.name === newFile.name ? newFile : file)
        : [...stagedFiles, newFile]

      alert('Your file has been successfully staged.')
      setFile(newFile)
      setStagedFiles(newState)
    },
    changeBranch: ({ history }) => (e) => {
      history.push(`?ref=${e.target.value}`)
    },
    pushToGithub: ({ branch, match, stagedFiles, setStagedFiles }) => (message) => {
      const { username, repo } = match.params
      const requestPath = `repos/${username}/${repo}/files/upsert?ref=${branch}`

      const body = {
        message,
        files: stagedFiles.map(file => ({ path: file.path, content: file.content, encoding: file.encoding }))
      }

      api.post(requestPath, body)
        .then(response => {
          console.log('response: ', response)
        })

      setStagedFiles([])
    }
  }),
  lifecycle({
    componentWillMount () {
      const { match, setBranchList, setCollections } = this.props
      const { username, repo } = match.params
      const baseRoute = `repos/${username}/${repo}`

      api.get(`${baseRoute}/collections`)
        .then(({ data }) => setCollections(Object.keys(data['collections'])))

      api.get(`${baseRoute}/branches`)
        .then(({ data }) => setBranchList(data.branches))
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(['queryParams'], ({ match, queryParams, setDirList, setFile, setBranch, stagedFiles }) => {
    setBranch(queryParams['ref'] || 'master')
    const stringifiedParams = qs.stringify(queryParams)
    const { repo, username } = match.params
    const route = `repos/${username}/${repo}/files?${stringifiedParams}`
    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])

    if (stagedFile) {
      setFile(stagedFile)
    } else {
      api.get(route)
        .then(({ data }) => {
          if (data['files']) {
          // sorts the directory to include folders before files.
            data['files'].sort(a => a.type === 'file' ? 1 : -1)
            setDirList(data['files'])
          } else if (data['file']) {
            setFile(data['file'])
          }
        })
        .catch(notifier.bad.bind(notifier))
    }
  })
)

export default enhance(Repo)
