
import FileTree from './FileTree'
import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import qs from 'qs'
import { api, notifier } from 'lib'
import { Loading } from 'atoms'

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
    getTree: ({ setTreeLoading, baseApiRoute, baseRoute, history, queryParams, setTree, branch }) => () => {
      if (branch) {
        const route = `${baseApiRoute}/files?ref=${branch}&tree=true&recursive=true`
        setTreeLoading(true)
        api.get(route)
          .then(({ data }) => {
            setTreeLoading(false)
            setTree(data)
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
    deleteFile: ({ baseApiRoute, baseRoute, history, queryParams, getTree, file, setFileTreeLoading, toggleModal }) => () => {
      const { ref } = queryParams
      const { sha, path } = file
      const pathArr = path.split('/')
      pathArr.pop()
      const parentPath = `/${baseRoute}/dir?path=${pathArr.join('/')}&ref=${ref}`
      const message = `[HT] Delete file ${file['name']}`

      const params = {
        ref,
        message,
        sha,
        path
      }

      const route = `${baseApiRoute}/files?${qs.stringify(params)}`
      setFileTreeLoading(true)
      api.delete(route)
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
    getDirList: ({ match, baseApiRoute, baseRoute, queryParams, stagedFiles, setDirList, setFile, setFileTreeLoading, collections, branch, history }) => () => {
      if (!match['params']['collection']) {
        const stringifiedParams = qs.stringify(queryParams)
        const route = `${baseApiRoute}/files?${stringifiedParams}`

        setFileTreeLoading(true)
        api.get(route)
          .then(({ data }) => {
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
            const pathArr = path.split('/')
            pathArr.pop()
            const parentPath = pathArr.join('/')
            Object.assign(queryParams, { path: parentPath })
            setFileTreeLoading(false)
            notifier.bad(resp)
            history.push(`/${baseRoute}/dir?${qs.stringify(queryParams)}`)
          })
      }
    }
  }),
  withPropsOnChange(['location'], ({ match, baseApiRoute, queryParams, getDirList, setFile, setBranch, stagedFiles, setFileTreeLoading, setOwner, setRepo }) => {
    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])
    stagedFile
      ? setFile(stagedFile)
      : getDirList()
  }),
  withPropsOnChange(['branch'], ({ getTree, setTree }) => {
    getTree()
  }),
  withEither(conditionLoadingFn, Loading)
)

export default enhance(FileTree)
