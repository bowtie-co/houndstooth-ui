
import qs from 'qs'
import { compose, withStateHandlers, withPropsOnChange, withHandlers, lifecycle } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import { Collections, EmptyState, EmptyItem } from './Collections'
import { api, notifier, octokit } from 'lib'
import { Loading } from 'atoms'

const nullConditionFn = ({ collections }) => !collections
const emptyStateConditionFn = ({ collections }) => collections.length === 0
const emptyItemConditionFn = ({ collections, match }) => collections.length > 0 && !match.params['collection']
const isCollectionLoadingConditionFn = ({ isCollectionLoading }) => isCollectionLoading

export default compose(
  withStateHandlers({
    items: [],
    defaultFields: {},
    activeItem: {},
    isCollectionLoading: false,
    fileUploads: {},
    stagedFileUploads: [],
    defaultFormData: null
  }, {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setDefaultFields: ({ defaultFields }) => (payload) => ({ defaultFields: payload }),
    setActiveItem: ({ activeItem }) => (payload) => ({ activeItem: payload }),
    setCollectionLoading: ({ isCollectionLoading }) => (payload) => ({ isCollectionLoading: payload }),
    setFileUploads: ({ fileUploads }) => (payload) => ({ fileUploads: payload }),
    setStagedFileUploads: ({ stagedFileUploads }) => (payload) => ({ stagedFileUploads: payload }),
    setDefaultFormData: ({ defaultFormData }) => (payload) => ({ defaultFormData: payload })
  }),
  withHandlers({
    buildFileUrl: ({ config, baseApiRoute, queryParams }) => (path) => {
      const defaultUrl = '/loading.svg'

      if (!path || path.trim() === '') {
        return Promise.resolve(defaultUrl)
      }

      const params = {
        // Remove leading slash for github path reference
        path: path.replace(/^\//, ''),
        ref: queryParams['ref']
      }

      if (config['url'] && config['url'].trim() !== '') {
        const siteUrl = config['url'].replace(/\/$/, '')
        return Promise.resolve(`${siteUrl}/${params['path'].replace(/\/+/g, '/')}`)
      }

      return new Promise(
        (resolve, reject) => {
          api.get(`${baseApiRoute}/files?${qs.stringify(params)}`).then(({ data }) => {
            const { file } = data

            console.log('looking up download url for path', path, file)

            if (file && file['download_url']) {
              resolve(file['download_url'])
            } else {
              resolve(defaultUrl)
            }
          }).catch(reject)
        }
      )
    }
  }),
  withHandlers({
    getFileDownloadUrl: ({ buildFileUrl }) => (path) => {
      return buildFileUrl(path)

      // const defaultUrl = '/loading.svg'
      // return buildFileUrl(path).then(url => {
      //   return fetch(url, { mode: 'cors', cache: 'no-cache' }).then(resp => {
      //     console.log('test url resp', resp)

      //     if (resp.status >= 400) {
      //       return defaultUrl
      //     } else {
      //       return url
      //     }
      //   })
      // })
    },
    editFileName: ({ setActiveItem, activeItem }) => (e) => {
      const editedItem = Object.assign({}, activeItem, { name: e.target.value })
      setActiveItem(editedItem)
    },
    selectItem: ({ history, baseRoute, match, branch }) => (itemName) => {
      if (itemName) {
        const { collection } = match.params
        history.push(`/${baseRoute}/collections/${collection || ''}/${itemName}?path=_${collection}/${itemName}&ref=${branch}`)
      }
    },
    getFileUploads: ({ match, setFileUploads, branch }) => () => {
      // const { username, repo } = match.params
      // api.get(`${baseApiRoute}/files?path=upload&ref=${branch || 'master'}&recursive=true&flatten=true`)
      //   .then(({ data: fileUploads }) => setFileUploads(fileUploads))
      //   .catch(notifier.bad.bind(notifier))
    },
    getItems: ({ collectionsApiRoute, match, setItems, setDefaultFields, setCollectionLoading, setCollectionName, setCollectionPath, branch }) => () => {
      const { collection } = match.params
      if (collection && branch) {
        setCollectionLoading(true)
        api.get(`${collectionsApiRoute}?ref=${branch}`)
          .then(({ data }) => {
            setItems(data['collection']['items'])
            setDefaultFields({ fields: data['collection']['fields'], markdown: '' })
            setCollectionName(data['collection']['name'])
            setCollectionPath(data['collection']['path'])
            setCollectionLoading(false)
          })
          .catch((resp) => {
            setItems([])
            setCollectionLoading(false)
            notifier.bad(resp)
          })
      }
    },
    editItem: ({ collectionsApiRoute, branch, activeItem, match }) => (formData) => {
      const { item } = match.params
      const message = `[HT] Edited item: ${activeItem.path}`
      const route = `${collectionsApiRoute}/items/${item}?ref=${branch || 'master'}&sha=${activeItem['sha']}&message=${message}`
      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      return api.put(route, updatedItem)
    },
    createItem: ({ collectionsApiRoute, branch, match, activeItem }) => (formData) => {
      if (activeItem['name'] && activeItem['name'].split('.').length <= 1) {
        activeItem['name'] = `${activeItem['name']}.md`
      }

      const updatedItem = Object.assign({}, activeItem, { fields: formData })
      const message = `[HT] Created item: ${activeItem.name}`
      const route = `${collectionsApiRoute}/items?ref=${branch || 'master'}&message=${message}`

      return api.post(route, updatedItem)
    },
    createFileUpload: ({ match, branch, stagedFileUploads, baseApiRoute, getFileUploads, setStagedFileUploads, setCollectionLoading }) => () => {
      if (stagedFileUploads.length > 0) {
        const newFiles = stagedFileUploads.map(file => {
          const updatedFile = {
            branch,
            path: file.name,
            content: file.base64.split('base64,')[1],
            message: `[HT] Uploaded ${file.name}`,
            encoding: 'base64',
            owner: match['params']['username'],
            repo: match['params']['repo']
          }

          return updatedFile
        })
        console.log('newFiles', newFiles)

        return newFiles.reduce((promiseChain, file) => {
          return promiseChain.then(() => octokit.repos.createFile(file))
        }, Promise.resolve(newFiles))

        // const body = {
        //   files: newFiles,
        //   message: `[HT] Uploaded ${newFiles.length} file(s)`
        // }

        // return api.post(`${baseApiRoute}/files/upsert`, body)
      } else {
        return Promise.resolve()
      }
    },
    handleMarkdownChange: ({ activeItem, setActiveItem }) => (content) => {
      const updated = Object.assign({}, activeItem, { markdown: content })
      setActiveItem(updated)
    }
  }),
  withPropsOnChange(
    ({ match, branch }, { match: nextMatch, branch: nextBranch }) => match.params.collection !== nextMatch.params.collection || branch !== nextBranch,
    ({ getItems, setActiveItem }) => {
      setActiveItem({})
      getItems()
    }
  ),
  withPropsOnChange([ 'match', 'items', 'defaultFields' ], ({ match, items, setActiveItem, defaultFields }) => {
    if (match['params']['item'] === 'new') {
      setActiveItem(defaultFields)
    } else {
      const currentItem = items.find(i => i.name === match['params']['item'])

      if (currentItem) {
        setActiveItem(currentItem)
      } else {
        setActiveItem({})
      }
    }
  }),
  withHandlers({
    handleFormSubmit: ({ collectionsRoute, items, createItem, getTree, history, editItem, createFileUpload, getItems, getFileUploads, match, setCollectionLoading, setStagedFileUploads, setDefaultFormData }) => (formData) => {
      setCollectionLoading(true)

      const isNewItem = match['params']['item'] === 'new'
      const upsertItem = isNewItem ? createItem : editItem

      createFileUpload()
        .then(() => upsertItem(formData)
          .then(({ data }) => {
            if (items.length > 0 && items[0]['name'] === 'NEW FILE') {
              items.shift()
            }
            getItems()
            setStagedFileUploads([])
            if (isNewItem) {
              history.push(`/${collectionsRoute}/${data.data.content['name']}`)
            }
          }))
        .then((resp) => {
          notifier.success(`Item ${isNewItem ? 'created' : 'edited'}`)
        })
        .catch((resp) => {
          setDefaultFormData(formData)
          setCollectionLoading(false)
          notifier.bad(resp)
        })
    },
    deleteItem: ({ collectionsApiRoute, branch, match, history, activeItem, getItems, getTree }) => () => {
      const { item } = match.params
      const { sha } = activeItem
      const message = 'Delete file'

      const route = `${collectionsApiRoute}/items/${item}?ref=${branch || 'master'}&message=${message}&sha=${sha}`
      api.delete(route)
        .then(resp => {
          getItems()
          notifier.success('Item deleted!')
          history.push(collectionsApiRoute)
        })
        .catch((resp) => {
          notifier.bad(resp)
        })
    }
  }),
  lifecycle({
    componentWillMount () {
      const { getFileUploads } = this.props
      getFileUploads()
    }
  }),
  withMaybe(nullConditionFn),
  withEither(emptyStateConditionFn, EmptyState),
  withEither(emptyItemConditionFn, EmptyItem),
  withEither(isCollectionLoadingConditionFn, Loading)
)(Collections)
