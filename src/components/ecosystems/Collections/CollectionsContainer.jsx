
import { compose, withStateHandlers, withPropsOnChange, withHandlers } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import { Collections, EmptyState, EmptyItem } from './Collections'
import { notifier, github } from 'lib'
import { CollectionItem } from '@bowtie/houndstooth-sdk'
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
    const isNewItem = match['params']['item'] === 'new'
    return {
      jekyll,
      isNewItem
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
    },
    editFileName: ({ setActiveItem, activeItem, isNewItem }) => (e) => {
      const editedItem = isNewItem
        ? Object.assign({}, activeItem, { name: e.target.value })
        : new CollectionItem(Object.assign({}, activeItem, { name: e.target.value }))

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

        jekyll.collection(collection, { ref: branch })
          .then(collection => {
            setCollectionName(collection.name)
            setCollectionPath(collection.path)

            collection.defaults({ ref: branch })
              .then(({ fields, body }) => {
                setDefaultFields({ fields, body })
              }).catch(resp => {
                setDefaultFields({ fields: {}, body: '' })
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
    renameItem: ({ activeItem, branch, match }) => () => {
      const message = `[HT] Renamed item ${match['params']['item']} --> ${activeItem['name']}`
      console.log('====================================')
      console.log('message', message)
      console.log('====================================')
      return activeItem.rename(activeItem['name'], { message, ref: branch })
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
    duplicateItem: ({ collectionsApiRoute, jekyll, branch, match, activeItem, updateCachedTree, history, collectionsRoute }) => () => {
      const { collection } = match['params']
    
      if (collection && branch) {
    
        return jekyll.collection(collection, { ref: branch })
          .then(collection => {
            const duplicatedItem = activeItem
            duplicatedItem['name'] = `${duplicatedItem['name'].split('.')[0]}-copy.md`
    
            const message = `[HT] Duplicated item: ${activeItem.path}`
    
            updateCachedTree()
    
            return collection.createItem(duplicatedItem, { ref: branch, message }).then(item => {
              console.log('done creating item', item)
              return Promise.resolve(item)
                .then(
                  history.push(`/${collectionsRoute}/${duplicatedItem['name']}?path=_${collection['name']}/${duplicatedItem['name']}&ref=${branch}`)  
                )
                .then(window.location.reload())
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
    handleBodyChange: ({ activeItem, setActiveItem }) => (body) => {
      const updated = Object.assign(activeItem, { body })
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
  withPropsOnChange(['match', 'items', 'defaultFields'], ({ isNewItem, match, items, setActiveItem, defaultFields, permissions }) => {
    if (isNewItem && permissions['push']) {
      setActiveItem(defaultFields)
    } else if (match['params']['item'] !== 'new') {
      const currentItem = items.find(i => i.name === match['params']['item'])
      currentItem
        ? setActiveItem(currentItem)
        : setActiveItem({})
    }
  }),
  withHandlers({
    handleFormSubmit: ({ isNewItem, collectionsRoute, items, branch, createItem, history, editItem, createFileUpload, getItems, match, setCollectionLoading, setStagedFileUploads, setDefaultFormData, setActiveItem }) => (formData) => {
      setCollectionLoading(true)
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
            // if (isNewItem) {
            // console.log('INSIDE HANDL FORM DATA --> ', data)

            // history.push(`/${collectionsRoute}/${data.data.content['name']}`)
            // }
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
    deleteItem: ({ collectionsApiRoute, branch, match, history, activeItem, getItems, updateCachedTree, setCollectionLoading }) => () => {
      setCollectionLoading(true)
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
