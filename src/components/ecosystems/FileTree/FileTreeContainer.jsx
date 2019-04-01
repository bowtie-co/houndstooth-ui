
import FileTree from './FileTree'
import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import qs from 'qs'
import { notifier } from 'lib'
import { Loading } from 'atoms'
import { storage, github } from 'lib/index'

const conditionLoadingFn = ({ isFileTreeLoading }) => isFileTreeLoading

export const enhance = compose(
  withStateHandlers(({ match, queryParams }) => ({
    dirList: [],
    file: {},
    tree: {},
    isDeleteModalOpen: false,
    isFileTreeLoading: false,
    isTreeLoading: false
  }), {
    toggleModal: ({ isDeleteModalOpen }) => () => ({ isDeleteModalOpen: !isDeleteModalOpen }),
    setFileTreeLoading: () => (payload) => ({ isFileTreeLoading: payload }),
    setTreeLoading: () => (payload) => ({ isTreeLoading: payload }),
    setDirList: () => (payload) => ({ dirList: payload }),
    setFile: () => (payload) => ({ file: payload }),
    setTree: () => (payload) => ({ tree: payload })
  }),
  withHandlers({
    getTree: ({ setTreeLoading, baseApiRoute, buildSdkParams, setTree, branch, match }) => () => {
      if (branch) {
        const cachedTree = storage.get('tree') || {}
        delete cachedTree[branch]

        setTreeLoading(true)
        const sdkParams = buildSdkParams({ tree: true, recursive: true, ref: branch }, false)

        github.files(sdkParams)
          .then(tree => {
            setTreeLoading(false)
            const newTree = Object.assign({}, cachedTree, { [branch]: tree })
            storage.set('tree', newTree)
            setTree(tree)
          })
          .catch((resp) => {
            setTreeLoading(false)
            notifier.bad(resp)
          })
      }
    }
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
    deleteFile: ({ buildSdkParams, baseApiRoute, baseRoute, history, queryParams, getTree, file, setFileTreeLoading, toggleModal }) => () => {
      const { ref } = queryParams
      const { sha, path } = file
      const pathArr = path.split('/')
      pathArr.pop()
      const parentPath = `/${baseRoute}/dir?path=${pathArr.join('/')}&ref=${ref}`
      const message = `[HT] Delete file ${file['name']}`

      const params = buildSdkParams({
        ref,
        message,
        sha,
        path
      })

      setFileTreeLoading(true)

      github.deleteFile(params)
        .then(resp => {
          toggleModal()
          getTree()
          setFileTreeLoading(false)
          notifier.success(`${path} has been successfully deleted.`)
          history.push(parentPath)
        })
        .catch((resp) => {
          setFileTreeLoading(false)
          notifier.bad(resp)
        })
    },
    getDirList: ({ buildSdkParams, match, baseApiRoute, baseRoute, queryParams, stagedFiles, setDirList, setFile, setFileTreeLoading, history }) => () => {
      if (!match['params']['collection']) {
        setFileTreeLoading(true)

        const { path = '/', ref } = queryParams
        const params = buildSdkParams({ path, ref })

        github.files(params)
          .then(data => {
            if (data['files']) {
              // add a new file from stagedFiles to dirList.
              const dirStagedFiles = stagedFiles.filter(file => {
                const pathArr = file['path'].split('/')
                pathArr.pop()

                // empty array and path is null
                const isPathRootDir = !queryParams['path']
                const isFileInRootDir = !/\//.test(file['path'])
                const doesPathMatchParams = queryParams['path'] === pathArr.join('/')

                return isPathRootDir ? isFileInRootDir : doesPathMatchParams
              })

              dirStagedFiles.forEach((file, i) => {
                const isInDirList = data['files'].some(f => f['path'] === file['path'])
                !isInDirList && data['files'].push(file)
              })

              // sorts the directory to include folders before files.
              data['files'].sort(a => a.type === 'dir' ? -1 : 1)

              setDirList(data['files'])
            } else if (data['file']) {
              setFile(data['file'])
            }
            setFileTreeLoading(false)
          })
          .catch((resp) => {
            const { path } = queryParams
            let newParams = Object.assign({}, queryParams)
            if (path) {
              const pathArr = path.split('/')
              pathArr.pop()
              const parentPath = pathArr.join('/')
              Object.assign(newParams, { path: parentPath })
            }
            setFileTreeLoading(false)
            notifier.bad(resp)
            history.push(`/${baseRoute}/dir?${qs.stringify(newParams)}`)
          }).catch(error => {
            setFileTreeLoading(false)
            notifier.bad(error)
          })
      }
    }
  }),
  withPropsOnChange(['location'], ({ queryParams, getDirList, setFile, stagedFiles }) => {
    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])
    stagedFile
      ? setFile(stagedFile)
      : getDirList()
  }),
  withPropsOnChange(['branch'], ({ getTree, setTree, branch }) => {
    const cachedTree = storage.get('tree') || {}
    const treeKeys = Object.keys(cachedTree)
    treeKeys.length > 0 && treeKeys.includes(branch)
      ? setTree(cachedTree[branch])
      : getTree()
  }),
  withEither(conditionLoadingFn, Loading)
)

export default enhance(FileTree)
