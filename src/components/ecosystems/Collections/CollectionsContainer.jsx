
import { compose, withStateHandlers, withPropsOnChange, withHandlers } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import { Collections, EmptyState, EmptyItem } from './Collections'
import { notifier, github } from 'lib'
import { Loading } from 'atoms'
import async from 'async'

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
  withPropsOnChange(['match'], ({ match, buildSdkParams }) => {
    const params = buildSdkParams()
    const jekyll = github.jekyll(params)

    return {
      jekyll
    }
  }),
  withHandlers({
    buildFileUrl: ({ config, buildSdkParams, queryParams, match }) => (path) => {
      const defaultUrl = '/loading.svg'

      if (!path || path.trim() === '') {
        return Promise.resolve(defaultUrl)
      }

      const params = buildSdkParams({
        // Remove leading slash for github path reference
        path: path.replace(/^\//, ''),
        ref: queryParams['ref']
      })

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
    getItems: ({ collectionsApiRoute, jekyll, match, setItems, setDefaultFields, setCollectionLoading, setCollectionName, setCollectionPath, branch }) => () => {
      const { collection } = match['params']

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
                async.each(items, (item, next) => {
                  item.init({ ref: branch }).then(item => {
                    next()
                  }).catch(next)
                }, (err) => {
                  if (err) {
                    console.error(err)
                  }

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
      }
    },
    editItem: ({ collectionsApiRoute, setActiveItem, branch, activeItem, match, jekyll }) => (formData) => {
      const { collection } = match['params']

      if (collection && branch) {
        Object.assign(activeItem.fields, formData)

        const message = `[HT] Edited item: ${activeItem.path}`

        console.log(activeItem)

        return activeItem.save({ ref: branch, message }).then(item => {
          console.log('done editing item', item)
          return Promise.resolve(item)
        })
      }
    },
    createItem: ({ collectionsApiRoute, jekyll, branch, match, activeItem, updateCachedTree }) => (formData) => {
      const { collection } = match['params']

      if (collection && branch) {
        return jekyll.collection(collection, { ref: branch })
          .then(collection => {
            if (activeItem['name'] && activeItem['name'].split('.').length <= 1) {
              activeItem['name'] = `${activeItem['name']}.md`
            }

            const updatedItem = Object.assign({}, activeItem, { fields: formData })
            const message = `[HT] Created item: ${activeItem.name}`

            updateCachedTree()

            return collection.createItem(updatedItem, { ref: branch, message }).then(item => {
              console.log('done creating item', item)
              return Promise.resolve(item)
            })
          })
      }
    },
    createFileUpload: ({ buildSdkParams, branch, stagedFileUploads, baseApiRoute }) => () => {
      if (stagedFileUploads.length > 0) {
        const newFiles = stagedFileUploads.map(file => {
          const updatedFile = buildSdkParams({
            branch,
            path: file.name,
            content: file.base64.split('base64,')[1],
            message: `[HT] Uploaded ${file.name}`,
            encoding: 'base64'
          })

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
      const updated = Object.assign(activeItem, { markdown: content })
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
    handleFormSubmit: ({ collectionsRoute, items, branch, createItem, history, editItem, createFileUpload, getItems, match, setCollectionLoading, setStagedFileUploads, setDefaultFormData, setActiveItem }) => (formData) => {
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
            setActiveItem(item)
            console.log('done with item', item)
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
      const message = `[HT] Delete Item: ${activeItem.path}`
      activeItem.delete({ message, branch })
        .then(resp => {
          getItems()

          updateCachedTree()

          notifier.success('Item deleted!')
        })
        .catch((resp) => {
          notifier.bad(resp)
        })
    }
  }),
  withMaybe(nullConditionFn),
  withEither(emptyStateConditionFn, EmptyState),
  withEither(emptyItemConditionFn, EmptyItem),
  withEither(isCollectionLoadingConditionFn, Loading)
)(Collections)
