
import { compose, withStateHandlers, withHandlers, withPropsOnChange, lifecycle } from 'recompose'
import Repo from './Repo'
import qs from 'qs'
import { withEither } from '@bowtie/react-utils'
import { notifier, storage, github } from 'lib'
import { Loading } from 'atoms'

const conditionLoadingFn = ({ isRepoLoading }) => isRepoLoading

export const enhance = compose(
  withStateHandlers(({ match, queryParams }) => ({
    activeRepo: {},
    permissions: {},
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
    setBranchList: () => (payload) => ({ branchList: payload }),
    setStagedFiles: () => (payload) => ({ stagedFiles: payload }),
    setBranch: () => (payload) => ({ branch: payload }),
    setConfig: () => (payload) => ({ config: payload }),
    setRepoLoading: () => (payload) => ({ isRepoLoading: payload }),
    setCollectionName: () => (payload) => ({ collectionName: payload }),
    setCollectionPath: () => (payload) => ({ collectionPath: payload })
  }),
  withHandlers({
    updateCachedTree: ({ branch }) => () => {
      const cachedTree = storage.get('tree') || {}
      delete cachedTree[branch]
      storage.set('tree', cachedTree)
    },
    removeStagedFile: ({ stagedFiles, setStagedFiles }) => (path) => {
      const newStagedFiles = [...stagedFiles].filter(file => file['path'] !== path)
      setStagedFiles(newStagedFiles)
    },
    changeBranch: ({ history, queryParams, match }) => (e) => {
      const newParams = Object.assign({}, queryParams, { ref: e.target.value })
      history.push(`${match['url']}?${qs.stringify(newParams)}`)
    }
  }),
  withHandlers({
    getBranchList: ({ buildSdkParams, setBranchList, baseApiRoute, setRepoLoading, match }) => () => {
      const storageKey = `${match.params['repo']}_branchList`
      const cachedBranchesList = storage.get(`branches`) ? storage.get(`branches`)[storageKey] : null
      if (!cachedBranchesList || cachedBranchesList.length <= 0) {
        setRepoLoading(true)
        const params = buildSdkParams()

        github.branches(params).then((data) => {
          const storageBranches = storage.get('branches') || {}
          const newBranches = Object.assign(storageBranches, { [storageKey]: data['branches'] })
          storage.set(`branches`, newBranches)
          setBranchList(data['branches'])
          setRepoLoading(false)
        }).catch((resp) => {
          setRepoLoading(false)
          notifier.bad(resp)
        })
      } else {
        setBranchList(cachedBranchesList)
      }
    },
    getCollections: ({ buildSdkParams, setRepoLoading, setCollections, setConfig, baseApiRoute, match, branch }) => () => {
      setRepoLoading(true)
      const params = buildSdkParams({ ref: branch }, false)
      const jekyll = github.jekyll(params)

      jekyll.config(params).then(config => {
        setConfig(config)
        setCollections(Object.keys(config['collections']))
        setRepoLoading(false)
      }).catch(() => {
        setRepoLoading(false)
        setCollections([])
      })
    },
    getRepo: ({ buildSdkParams, baseApiRoute, setActiveRepo, setBranch, setPermissions, match, queryParams }) => () => {
      const params = buildSdkParams()
      github.repo(params).then(data => {
        queryParams['ref']
          ? setBranch(queryParams['ref'])
          : setBranch(data['repo']['default_branch'])

        setActiveRepo(data['repo'])
        setPermissions(data['repo']['permissions'])
      }).catch(console.error)
    },
    pushToGithub: ({ buildSdkParams, branch, match, updateCachedTree, baseApiRoute, stagedFiles, setStagedFiles, setRepoLoading }) => (message) => {
      if (message) {
        updateCachedTree()
        setRepoLoading(true)

        const body = buildSdkParams({
          ref: branch,
          message,
          files: stagedFiles.map(file => ({ path: file.path, content: file.content, encoding: file.encoding }))
        })

        github.upsertFiles(body)
          .then(resp => {
            notifier.success('Files have been successfully committed to GitHub.')
            setRepoLoading(false)
            setStagedFiles([])
          })
          .catch(error => {
            setRepoLoading(false)
            notifier.bad(error)
          })
      } else {
        notifier.msg('Please add a commit message.', 'error')
      }
    }
  }),
  withPropsOnChange(['baseApiRoute'], ({ getCollections, getRepo, getBranchList }) => {
    getRepo()
    getBranchList()
    getCollections()
  }),
  withPropsOnChange(['location'], ({ queryParams, branch, setBranch }) => {
    setBranch(queryParams['ref'] || branch)
  }),
  withPropsOnChange([ 'baseRoute', 'config' ], ({ match }) => {
    const { username, repo } = match['params']
    notifier.userChange({ channels: { ro: [ `repos.${username}-${repo}` ] } })
  }),
  withPropsOnChange(['branch'], ({ getCollections }) => {
    getCollections()
  }),
  lifecycle({
    componentWillUnmount () {
      this.props.setCollections(null)
    }
  }),
  withEither(conditionLoadingFn, Loading)
)

export default enhance(Repo)
