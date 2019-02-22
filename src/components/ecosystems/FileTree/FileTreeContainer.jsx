
import { compose, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose'
import FileTree from './FileTree'
import qs from 'qs'
import { api, notifier } from 'lib'

export const enhance = compose(
  withStateHandlers(({ match, queryParams }) => ({
    dirList: [],
    file: {}
  }), {
    setDirList: () => (payload) => ({ dirList: payload }),
    setFile: () => (payload) => ({ file: payload })
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
    deleteFile: () => () => {

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
    }
  }),
  withPropsOnChange(['location'], ({ match, baseApiRoute, queryParams, getDirList, setFile, setBranch, stagedFiles, setRepoLoading, setOwner, setRepo }) => {
    const stagedFile = stagedFiles.find(file => file['path'] === queryParams['path'])
    stagedFile
      ? setFile(stagedFile)
      : getDirList()
  })
)

export default enhance(FileTree)
