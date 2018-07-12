/* global alert  */

import { compose, withStateHandlers, withHandlers, withPropsOnChange, lifecycle } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import Repo from './Repo'
import { Loading } from '../../atoms'

import qs from 'qs'
import api from '../../../lib/api'
import notifier from '../../../lib/notifier'

// conditional functions here:
const loadingConditionalFn = ({ isRepoLoading }) => isRepoLoading

export const enhance = compose(
  withStateHandlers(({ queryParams, match: { params: { username, repo } } }) => ({
    baseRoute: `repos/${username}/${repo}`,
    branchList: [],
    branch: queryParams['ref'] || 'master',
    stagedFiles: [],
    dirList: [],
    file: {},
    collections: [],
    fileUploads: {},
    stagedFileUploads: [],
    isRepoLoading: false
  }), {
    setBaseRoute: ({ baseRoute }) => (payload) => ({ baseRoute: payload }),
    setDirList: ({ dirList }) => (payload) => ({ dirList: payload }),
    setFile: ({ file }) => (payload) => ({ file: payload }),
    setCollections: ({ collections }) => (payload) => ({ collections: payload }),
    setStagedFiles: ({ stagedFiles }) => (payload) => ({ stagedFiles: payload }),
    setStagedFileUploads: ({ stagedFileUploads }) => (payload) => ({ stagedFileUploads: payload }),
    setFileUploads: ({ fileUploads }) => (payload) => ({ fileUploads: payload }),
    setBranchList: ({ branchList }) => (payload) => ({ branchList: payload }),
    setBranch: ({ branch }) => (payload) => ({ branch: payload }),
    setRepoLoading: ({ isRepoLoading }) => (payload) => ({ isRepoLoading: payload })
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
    pushToGithub: ({ branch, baseRoute, stagedFiles, setStagedFiles, setRepoLoading }) => (message) => {
      const requestPath = `${baseRoute}/files/upsert?ref=${branch}`
      const body = {
        message,
        files: stagedFiles.map(file => ({ path: file.path, content: file.content, encoding: file.encoding }))
      }
      setRepoLoading(true)
      api.post(requestPath, body)
        .then(response => {
          setRepoLoading(false)
          console.log('response: ', response)
        })

      setStagedFiles([])
    }
  }),
  lifecycle({
    componentWillMount () {
      const { setBranchList, setCollections, setFileUploads, branch, baseRoute, setRepoLoading } = this.props
      setRepoLoading(true)
      api.get(`${baseRoute}/collections`)
        .then(({ data }) => {
          setCollections(Object.keys(data['collections']))
          setRepoLoading(false)
        })
      
      api.get(`${baseRoute}/branches`)
        .then(({ data }) => {
          setBranchList(data.branches)
          setRepoLoading(false)
        })
        .catch(notifier.bad.bind(notifier))

      api.get(`${baseRoute}/files?path=upload&ref=${branch || 'master'}&recursive=true&flatten=true`)
        .then(({ data: fileUploads }) => setFileUploads(fileUploads))
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(['queryParams'], ({ baseRoute, queryParams, setDirList, setFile, setBranch, stagedFiles, setRepoLoading }) => {
    setBranch(queryParams['ref'] || 'master')
    const stringifiedParams = qs.stringify(queryParams)
    const route = `${baseRoute}/files?${stringifiedParams}`
    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])

    if (stagedFile) {
      setFile(stagedFile)
    } else {
      setRepoLoading(true)
      api.get(route)
        .then(({ data }) => {
          if (data['files']) {
          // sorts the directory to include folders before files.
            data['files'].sort(a => a.type === 'file' ? 1 : -1)
            setDirList(data['files'])
          } else if (data['file']) {
            setFile(data['file'])
          }
          setRepoLoading(false)
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withEither(loadingConditionalFn, Loading)
)

export default enhance(Repo)
