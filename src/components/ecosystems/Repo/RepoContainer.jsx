
import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import Repo from './Repo'
import qs from 'qs'
import { withEither } from '@bowtie/react-utils'
import { api, notifier, storage } from 'lib'
import { Loading } from 'atoms'

const conditionLoadingFn = ({ isRepoLoading }) => isRepoLoading

export const enhance = compose(
  withStateHandlers(({ queryParams, repo }) => ({
    branchList: [],
    branch: repo['default_branch'],
    stagedFiles: [],
    dirList: [],
    file: {},
    tree: {},
    config: {},
    isRepoLoading: false,
    collectionName: '',
    collectionPath: ''
  }), {
    setBranchList: () => (payload) => ({ branchList: payload }),
    setDirList: () => (payload) => ({ dirList: payload }),
    setTree: () => (payload) => ({ tree: payload }),
    setFile: () => (payload) => ({ file: payload }),
    setStagedFiles: () => (payload) => ({ stagedFiles: payload }),
    setBranch: () => (payload) => ({ branch: payload }),
    setConfig: () => (payload) => ({ config: payload }),
    setRepoLoading: () => (payload) => ({ isRepoLoading: payload }),
    setCollectionName: ({ collectionName }) => (payload) => ({ collectionName: payload }),
    setCollectionPath: ({ collectionPath }) => (payload) => ({ collectionPath: payload })
  }),
  withHandlers({
    saveFile: ({ setFile, file, stagedFiles, setStagedFiles, queryParams }) => (content) => {
      const newFile = Object.assign({}, file, { content })
      const filePath = queryParams['path']

      const shouldUpdateStaged = stagedFiles.some(file => file['path'] === filePath)

      const newState = shouldUpdateStaged
        ? stagedFiles.map(file => file.name === newFile.name ? newFile : file)
        : [...stagedFiles, newFile]

      notifier.success('Your file has been successfully staged.')
      setFile(newFile)
      setStagedFiles(newState)
    },
    removeStagedFile: ({ stagedFiles, setStagedFiles }) => (path) => {
      const newStagedFiles = [...stagedFiles].filter(file => file['path'] !== path)
      setStagedFiles(newStagedFiles)
    },
    changeBranch: ({ history, queryParams, match }) => (e) => {
      Object.assign(queryParams, { ref: e.target.value })
      history.push(`${match['url']}?${qs.stringify(queryParams, { encode: false })}`)
    },
    pushToGithub: ({ branch, history, baseRoute, baseApiRoute, stagedFiles, setStagedFiles, setRepoLoading }) => (message) => {
      if (message) {
        const requestPath = `${baseApiRoute}/files/upsert?ref=${branch}`
        const body = {
          message,
          files: stagedFiles.map(file => ({ path: file.path, content: file.content, encoding: file.encoding }))
        }
        setRepoLoading(true)
        api.post(requestPath, body)
          .then(response => {
            notifier.success('Files have been successfully committed to GitHub.')
            setRepoLoading(false)
            setStagedFiles([])
            // history.push(`/${baseRoute}/dir`)
          })
          .catch(notifier.bad.bind(notifier))
      } else {
        notifier.msg('Please add a commit message.', 'error')
      }
    },
    getBranchList: ({ setBranchList, baseApiRoute, setRepoLoading, match }) => () => {
      const storageKey = `${match.params['repo']}_branchList`
      const cachedBranchesList = storage.get(`branches`) ? storage.get(`branches`)[storageKey] : null

      if (!cachedBranchesList || cachedBranchesList.length <= 0) {
        setRepoLoading(true)
        api.get(`${baseApiRoute}/branches`)
          .then(({ data }) => {
            const storageBranches = storage.get('branches') || {}
            const newBranches = Object.assign(storageBranches, { [storageKey]: data['branches'] })

            storage.set(`branches`, newBranches)
            setBranchList(data['branches'])
            setRepoLoading(false)
          })
          .catch((resp) => {
            setRepoLoading(false)
            notifier.bad(resp)
          })
      } else {
        setBranchList(cachedBranchesList)
      }
    },
    getCollections: ({ setRepoLoading, setCollections, setConfig, baseApiRoute }) => () => {
      setRepoLoading(true)
      api.get(`${baseApiRoute}/collections`)
        .then(({ data }) => {
          setConfig(data)
          const { collections } = data
          setCollections(Object.keys(collections))
          setRepoLoading(false)
        })
        .catch(() => {
          setRepoLoading(false)
          setCollections([])
        })
    },
    getDirList: ({ match, baseApiRoute, queryParams, setDirList, setFile, setRepoLoading, collections }) => () => {
      if (!match['params']['collection']) {
        const stringifiedParams = qs.stringify(queryParams)
        const route = `${baseApiRoute}/files?${stringifiedParams}`

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
    },
    getTree: ({ baseApiRoute, queryParams, setTree }) => () => {
      const route = `${baseApiRoute}/files?&tree=true&recursive=true`
      api.get(route)
        .then(({ data }) => {
          setTree(data)
        })
        .catch((resp) => {
          notifier.bad(resp)
        })
    }
  }),
  withPropsOnChange(['baseApiRoute'], ({ getCollections, getTree, getRepo, getBranchList, setRepoLoading, baseApiRoute }) => {
    getBranchList()
    getCollections()
    getTree()
    getRepo()
  }),
  withPropsOnChange(['location'], ({ baseApiRoute, queryParams, getDirList, setFile, setBranch, stagedFiles, setRepoLoading }) => {
    setBranch(queryParams['ref'] || 'master')

    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])
    if (stagedFile) {
      setFile(stagedFile)
    } else {
      // setRepoLoading(true)
      getDirList()
    }
  }),
  withEither(conditionLoadingFn, Loading)
)

export default enhance(Repo)
