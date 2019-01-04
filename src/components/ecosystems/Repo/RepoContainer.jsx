/* global alert  */

import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
// import { withEither } from '@bowtie/react-utils'
import Repo from './Repo'
// import { Loading } from 'atoms'
import qs from 'qs'
import { api, notifier } from 'lib'

// conditional functions here:
// const loadingConditionalFn = ({ isRepoLoading }) => isRepoLoading

export const enhance = compose(
  withStateHandlers(({ queryParams }) => ({
    branchList: [],
    branch: queryParams['ref'] || 'master',
    stagedFiles: [],
    dirList: [],
    file: {},
    isRepoLoading: false
  }), {
    setBranchList: () => (payload) => ({ branchList: payload }),
    setDirList: () => (payload) => ({ dirList: payload }),
    setFile: () => (payload) => ({ file: payload }),
    setStagedFiles: () => (payload) => ({ stagedFiles: payload }),
    setBranch: () => (payload) => ({ branch: payload }),
    setRepoLoading: () => (payload) => ({ isRepoLoading: payload })
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
    changeBranch: ({ history, queryParams, match }) => (e) => {
      Object.assign(queryParams, { ref: e.target.value })
      history.push(`${match['url']}?${qs.stringify(queryParams, { encode: false })}`)
    },
    pushToGithub: ({ branch, baseApiRoute, stagedFiles, setStagedFiles, setRepoLoading }) => (message) => {
      const requestPath = `${baseApiRoute}/files/upsert?ref=${branch}`
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
    },
    getBranchList: ({ setBranchList, baseApiRoute, setRepoLoading }) => () => {
      api.get(`${baseApiRoute}/branches`)
        .then(({ data }) => {
          console.log('====================================')
          console.log('branches', data)
          console.log('====================================')
          setBranchList(data['branches'])
          setRepoLoading(false)
        })
        .catch((resp) => {
          setRepoLoading(false)
          notifier.bad(resp)
        })
    },
    getCollections: ({ setRepoLoading, setCollections, baseApiRoute }) => () => {
      api.get(`${baseApiRoute}/collections`)
        .then(({ data }) => {
          const { collections } = data
          setCollections(Object.keys(collections))
          setRepoLoading(false)
        })
        .catch(() => setCollections([]))
    }
  }),
  withPropsOnChange(['baseApiRoute'], ({ getCollections, getBranchList, setRepoLoading, baseApiRoute }) => {
    setRepoLoading(true)
    getBranchList()
    getCollections()
  }),
  withPropsOnChange(['location'], ({ baseApiRoute, queryParams, setDirList, setFile, setBranch, stagedFiles, setRepoLoading }) => {
    setBranch(queryParams['ref'] || 'master')
    const stringifiedParams = qs.stringify(queryParams)
    const route = `${baseApiRoute}/files?${stringifiedParams}`
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
        .catch((resp) => {
          setRepoLoading(false)
          notifier.bad(resp)
        })
    }
  })
  // withEither(loadingConditionalFn, Loading)
)

export default enhance(Repo)
