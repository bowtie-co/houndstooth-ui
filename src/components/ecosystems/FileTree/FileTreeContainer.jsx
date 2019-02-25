
import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import FileTree from './FileTree'
import qs from 'qs'
import { api, notifier } from 'lib'

export const enhance = compose(
  withStateHandlers(({ match, queryParams }) => ({
    dirList: [],
    file: {},
    isDeleteModalOpen: false,
    tree: {}
  }), {
    toggleModal: ({ isDeleteModalOpen }) => () => ({ isDeleteModalOpen: !isDeleteModalOpen }),
    setDirList: () => (payload) => ({ dirList: payload }),
    setFile: () => (payload) => ({ file: payload }),
    setTree: () => (payload) => ({ tree: payload })
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
    deleteFile: ({ baseApiRoute, baseRoute, history, queryParams, getTree, file, setRepoLoading }) => () => {
      const { ref } = queryParams
      const { sha, path } = file
      const pathArr = path.split('/')
      pathArr.pop()
      const parentPath = `/${baseRoute}/dir?path=${pathArr.join('/')}&ref=${ref}`
      const message = `[HT] Delete file ${file['name']}`
      setRepoLoading(true)
      const route = `${baseApiRoute}/files?ref=${ref}&message=${message}&sha=${sha}&path=${path}`
      api.delete(route)
        .then(resp => {
          setRepoLoading(false)
          history.push(parentPath)
        })
        .catch((resp) => {
          setRepoLoading(false)
          notifier.bad(resp)
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
    getTree: ({ setRepoLoading, baseApiRoute, baseRoute, history, queryParams, setTree, branch }) => () => {
      if (branch) {
        const route = `${baseApiRoute}/files?ref=${branch}&tree=true&recursive=true`
        api.get(route)
          .then(({ data }) => setTree(data))
          .catch(notifier.bad.bind(notifier))
      }
    }
  }),
  withPropsOnChange(['location'], ({ match, baseApiRoute, queryParams, getDirList, setFile, setBranch, stagedFiles, setRepoLoading, setOwner, setRepo }) => {
    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])
    stagedFile
      ? setFile(stagedFile)
      : getDirList()
  }),
  withPropsOnChange(['branch'], ({ getTree, setTree }) => {
    getTree()
  })
)

export default enhance(FileTree)
