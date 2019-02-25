
import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import Repo from './Repo'
import qs from 'qs'
import { withEither } from '@bowtie/react-utils'
import { api, notifier, storage } from 'lib'
import { Loading } from 'atoms'

const conditionLoadingFn = ({ isRepoLoading }) => isRepoLoading

export const enhance = compose(
  withStateHandlers(({ match, queryParams }) => ({
    activeRepo: {},
    permissions: {},
    owner: match['params']['username'] || '',
    repo: match['params']['repo'] || '',
    branchList: [],
    branch: queryParams['ref'],
    stagedFiles: [],
    dirList: [],
    file: {},
    tree: {},
    config: {},
    isRepoLoading: false,
    collectionName: '',
    collectionPath: ''
  }), {
    setActiveRepo: ({ activeRepo }) => (payload) => ({ activeRepo: payload }),
    setPermissions: ({ permissions }) => (payload) => ({ permissions: payload }),
    setOwner: () => (payload) => ({ owner: payload }),
    setRepo: () => (payload) => ({ repo: payload }),
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
    getDirList: ({ match, baseApiRoute, baseRoute, history, queryParams, setDirList, setFile, setRepoLoading, collections, branch }) => () => {
      if (!match['params']['collection']) {
        const stringifiedParams = qs.stringify(queryParams)
        const route = `${baseApiRoute}/files?${stringifiedParams}`
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
            notifier.msg(`The file ${queryParams['path']} does not exist on ${queryParams['ref']} branch.`, 'error')
            if (resp['status'] === 404 && queryParams['path']) {
              history.push(`/${baseRoute}/dir?ref=${queryParams['ref']}`)
            }
          })
      }
    },
    getTree: ({ setRepoLoading, baseApiRoute, baseRoute, history, queryParams, setTree, branch }) => () => {
      if (branch) {
        setRepoLoading(true)
        const route = `${baseApiRoute}/files?ref=${branch}&tree=true&recursive=true`
        api.get(route)
          .then(({ data }) => {
            setRepoLoading(false)
            setTree(data)
          })
          .catch((resp) => {
            setRepoLoading(false)
            notifier.bad(resp)
          })
      }
    },
    getRepo: ({ baseApiRoute, setActiveRepo, setBranch, setPermissions }) => () => {
      api.get(baseApiRoute)
        .then(({ data }) => {
          setBranch(data['repo']['default_branch'])
          setActiveRepo(data['repo'])
          setPermissions(data.repo['permissions'])
        })
        .catch(notifier.bad.bind(notifier))
    }
  }),
  withPropsOnChange(['baseApiRoute'], ({ getCollections, getTree, getRepo, getBranchList, setRepoLoading, baseApiRoute }) => {
    getRepo()
    getBranchList()
    getCollections()
  }),
  withPropsOnChange(['branch'], ({ getTree, branch }) => {
    getTree()
  }),
  withPropsOnChange(['location'], ({ match, baseApiRoute, queryParams, getDirList, setFile, setBranch, branch, stagedFiles, setRepoLoading, setOwner, setRepo }) => {
    const { username, repo } = match['params']

    setRepo(repo)
    setOwner(username)
    setBranch(queryParams['ref'] || branch)

    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])
    if (stagedFile) {
      setFile(stagedFile)
    } else {
      // setRepoLoading(true)
      getDirList()
    }
  }),
  withPropsOnChange([ 'owner', 'repo', 'config' ], ({ owner, repo }) => {
    notifier.userChange({ channels: { ro: [ `repos.${owner}-${repo}` ] } })
  }),
  withEither(conditionLoadingFn, Loading)
)

export default enhance(Repo)
