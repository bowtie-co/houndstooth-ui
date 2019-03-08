
import qs from 'qs'
import { compose, withStateHandlers, withPropsOnChange, withHandlers, lifecycle } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import { Collections, EmptyState, EmptyItem } from './Collections'
import { api, notifier, octokit, github } from 'lib'
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
  withPropsOnChange(['match'], ({ match }) => {
    const { username: owner, repo } = match['params']
    const jekyll = github.jekyll({ owner, repo })

    return {
      jekyll
    }
  }),
  withHandlers({
    buildFileUrl: ({ config, baseApiRoute, queryParams, match }) => (path) => {
      const { username: owner, repo } = match['params']
      const defaultUrl = '/loading.svg'

      if (!path || path.trim() === '') {
        return Promise.resolve(defaultUrl)
      }

      const params = {
        // Remove leading slash for github path reference
        path: path.replace(/^\//, ''),
        ref: queryParams['ref'],
        owner,
        repo
      }

      if (config['url'] && config['url'].trim() !== '') {
        const siteUrl = config['url'].replace(/\/$/, '')
        return Promise.resolve(`${siteUrl}/${params['path'].replace(/\/+/g, '/')}`)
      }

      return new Promise(
        (resolve, reject) => {
          github.files(params).then((data) => {
            const { file } = data

            console.log('looking up download url for path', path, file)

            if (file && file['download_url']) {
              resolve(file['download_url'])
            } else {
              resolve(defaultUrl)
            }
          }).catch(reject)
          // api.get(`${baseApiRoute}/files?${qs.stringify(params)}`).then(({ data }) => {
          //   const { file } = data

          //   console.log('looking up download url for path', path, file)

          //   if (file && file['download_url']) {
          //     resolve(file['download_url'])
          //   } else {
          //     resolve(defaultUrl)
          //   }
          // }).catch(reject)
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
    getItems: ({ collectionsApiRoute, jekyll, match, setItems, setDefaultFields, setCollectionLoading, setCollectionName, setCollectionPath, branch }) => () => {
      const { username: owner, repo, collection } = match['params']

      console.log('getting items!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

      if (collection && branch) {
        setCollectionLoading(true)

        // const jekyll = github.jekyll({ owner, repo })

        jekyll.collection(collection, { ref: branch })
          .then(collection => {
            setCollectionName(collection.name)
            setCollectionPath(collection.path)

            collection.defaults({ ref: branch })
              .then(({ fields, content }) => {
                setDefaultFields({ fields, markdown: content })
              }).catch(resp => {
                setDefaultFields({ fields: {}, markdown: '' })
                notifier.bad(resp)
              })

            collection.clearCache()

            collection.items({ ref: branch })
              .then(items => {
                return items.reduce((promiseChain, item) => {
                  return promiseChain.then(() => item.init({ ref: branch }))
                }, Promise.resolve()).then(() => {
                  setItems(items)
                  setCollectionLoading(false)
                })
              }).catch(resp => {
                setItems([])
                setCollectionLoading(false)
                notifier.bad(resp)
              })
          })
          .catch((resp) => {
            setItems([])
            setCollectionLoading(false)
            notifier.bad(resp)
          })

        // api.get(`${collectionsApiRoute}?ref=${branch}`)
        //   .then(({ data }) => {
        //     setItems(data['collection']['items'])
        //     setDefaultFields({ fields: data['collection']['fields'], markdown: '' })
        //     setCollectionName(data['collection']['name'])
        //     setCollectionPath(data['collection']['path'])
        //     setCollectionLoading(false)
        //   })
        //   .catch((resp) => {
        //     setItems([])
        //     setCollectionLoading(false)
        //     notifier.bad(resp)
        //   })
      }
    },
    editItem: ({ collectionsApiRoute, branch, activeItem, match, jekyll }) => (formData) => {
      const { username: owner, repo, collection } = match['params']

      if (collection && branch) {
        Object.assign(activeItem.fields, formData)

        const message = `[HT] Edited item: ${activeItem.path}`

        console.log(activeItem)

        return activeItem.save({ ref: branch, message })
      }
    },
    createItem: ({ collectionsApiRoute, jekyll, branch, match, activeItem, updateCachedTree }) => (formData) => {
      const { username: owner, repo, collection } = match['params']

      if (collection && branch) {
        return jekyll.collection(collection, { ref: branch })
          .then(collection => {
            if (activeItem['name'] && activeItem['name'].split('.').length <= 1) {
              activeItem['name'] = `${activeItem['name']}.md`
            }

            const updatedItem = Object.assign({}, activeItem, { fields: formData })
            const message = `[HT] Created item: ${activeItem.name}`

            updateCachedTree()

            return collection.createItem(updatedItem, { ref: branch, message })
          })
      }
    },
    createFileUpload: ({ match, branch, stagedFileUploads, baseApiRoute }) => () => {
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

        return newFiles.reduce((promiseChain, file) => {
          return promiseChain.then(() => github.createFile(file))
        }, Promise.resolve(newFiles))
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
  withPropsOnChange(['match', 'items', 'defaultFields'], ({ match, items, setActiveItem, defaultFields, permissions }) => {
    if (match['params']['item'] === 'new' && permissions['push']) {
      setActiveItem(defaultFields)
    } else if (match['params']['item'] !== 'new') {
      const currentItem = items.find(i => i.name === match['params']['item'])
      currentItem
        ? setActiveItem(currentItem)
        : setActiveItem({})
    }
  }),
  withHandlers({
    handleFormSubmit: ({ collectionsRoute, items, branch, createItem, history, editItem, createFileUpload, getItems, match, setCollectionLoading, setStagedFileUploads, setDefaultFormData }) => (formData) => {
      setCollectionLoading(true)

      const isNewItem = match['params']['item'] === 'new'
      const upsertItem = isNewItem ? createItem : editItem

      createFileUpload()
        .then(() => upsertItem(formData)
          .then((item) => {
            if (items.length > 0 && items[0]['name'] === 'NEW FILE') {
              items.shift()
            }
            getItems()
            setStagedFileUploads([])
            if (isNewItem) {
              history.push(`/${collectionsRoute}/${item['name']}?ref=${branch}`)
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
    deleteItem: ({ collectionsApiRoute, branch, match, history, activeItem, getItems, updateCachedTree }) => () => {
      const { item } = match.params
      const { sha } = activeItem
      const message = 'Delete file'

      const route = `${collectionsApiRoute}/items/${item}?ref=${branch || 'master'}&message=${message}&sha=${sha}`
      api.delete(route)
        .then(resp => {
          getItems()

          updateCachedTree()

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
