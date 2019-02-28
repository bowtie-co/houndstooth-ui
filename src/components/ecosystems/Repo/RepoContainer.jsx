
import { compose, withStateHandlers, withHandlers, withPropsOnChange, lifecycle } from 'recompose'
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
    config: {},
    isRepoLoading: false,
    collectionName: '',
    collectionPath: ''
  }), {
    setActiveRepo: () => (payload) => ({ activeRepo: payload }),
    setPermissions: () => (payload) => ({ permissions: payload }),
    setOwner: () => (payload) => ({ owner: payload }),
    setRepo: () => (payload) => ({ repo: payload }),
    setBranchList: () => (payload) => ({ branchList: payload }),
    setStagedFiles: () => (payload) => ({ stagedFiles: payload }),
    setBranch: () => (payload) => ({ branch: payload }),
    setConfig: () => (payload) => ({ config: payload }),
    setRepoLoading: () => (payload) => ({ isRepoLoading: payload }),
    setCollectionName: () => (payload) => ({ collectionName: payload }),
    setCollectionPath: () => (payload) => ({ collectionPath: payload })
  }),
  withHandlers({
    removeStagedFile: ({ stagedFiles, setStagedFiles }) => (path) => {
      const newStagedFiles = [...stagedFiles].filter(file => file['path'] !== path)
      setStagedFiles(newStagedFiles)
    },
    changeBranch: ({ history, queryParams, match }) => (e) => {
      const newParams = Object.assign({}, queryParams, { ref: e.target.value })
      history.push(`${match['url']}?${qs.stringify(newParams)}`)
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
    getRepo: ({ baseApiRoute, setActiveRepo, setBranch, setPermissions }) => () => {
      api.get(baseApiRoute)
        .then(({ data }) => {
          setBranch(data['repo']['default_branch'])
          setActiveRepo(data['repo'])
          setPermissions(data.repo['permissions'])
        })
        .catch(notifier.bad.bind(notifier))
    },
    pushToGithub: ({ branch, history, baseRoute, baseApiRoute, stagedFiles, setStagedFiles, setRepoLoading }) => (message) => {
      if (message) {
        const requestPath = `${baseApiRoute}/files/upsert?ref=${branch}`
        const body = {
          message,
          files: stagedFiles.map(file => ({ path: file.path, content: file.content, encoding: file.encoding }))
        }
        storage.remove('tree')
        setRepoLoading(true)
        api.post(requestPath, body)
          .then(response => {
            notifier.success('Files have been successfully committed to GitHub.')
            setRepoLoading(false)
            setStagedFiles([])
          })
          .catch(notifier.bad.bind(notifier))
      } else {
        notifier.msg('Please add a commit message.', 'error')
      }
    }
  }),
  withPropsOnChange(['baseApiRoute'], ({ getCollections, getRepo, getBranchList, setRepoLoading, baseApiRoute }) => {
    getRepo()
    getBranchList()
    getCollections()
  }),
  withPropsOnChange(['location'], ({ match, baseApiRoute, queryParams, getDirList, setFile, setBranch, branch, stagedFiles, setRepoLoading, setOwner, setRepo }) => {
    const { username, repo } = match['params']
    setRepo(repo)
    setOwner(username)
    setBranch(queryParams['ref'] || branch)
  }),
  withPropsOnChange([ 'owner', 'repo', 'config' ], ({ owner, repo }) => {
    notifier.userChange({ channels: { ro: [ `repos.${owner}-${repo}` ] } })
  }),
  lifecycle({
    componentWillUnmount () {
      this.props.setCollections(null)
    }
  }),
  withEither(conditionLoadingFn, Loading)
)

export default enhance(Repo)
