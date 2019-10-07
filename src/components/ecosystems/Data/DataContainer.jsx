
import { compose, withStateHandlers, withPropsOnChange, withHandlers } from 'recompose'
import { withEither, withMaybe } from '@bowtie/react-utils'
import { Data, EmptyState, EmptyItem } from './Data'
import { notifier, github } from 'lib'
import { CollectionItem } from '@bowtie/houndstooth-sdk'
import { Loading } from 'atoms'
import async from 'async'

const nullConditionFn = ({ data }) => !data
const emptyStateConditionFn = ({ data }) => data.length === 0
const emptyItemConditionFn = ({ data, queryParams }) => data.length > 0 && !queryParams['path']
const isDataLoadingConditionFn = ({ isDataLoading }) => isDataLoading

export default compose(
  withStateHandlers({
    items: [],
    dataFields: null,
    defaultFields: {},
    activeItem: {},
    isDataLoading: false,
    fileUploads: {},
    stagedFileUploads: [],
    defaultFormData: null
  }, {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setDataFields: ({ dataFields }) => (payload) => ({ dataFields: payload }),
    setDefaultFields: ({ defaultFields }) => (payload) => ({ defaultFields: payload }),
    setActiveItem: ({ activeItem }) => (payload) => ({ activeItem: payload }),
    setDataLoading: ({ isDataLoading }) => (payload) => ({ isDataLoading: payload }),
    setFileUploads: ({ fileUploads }) => (payload) => ({ fileUploads: payload }),
    setStagedFileUploads: ({ stagedFileUploads }) => (payload) => ({ stagedFileUploads: payload }),
    setDefaultFormData: ({ defaultFormData }) => (payload) => ({ defaultFormData: payload })
  }),
  withPropsOnChange(['match', 'queryParams'], ({ buildSdkParams, queryParams, setDataFields }) => {
    const params = buildSdkParams()
    const jekyll = github.jekyll(params)

    jekyll.data({ path: queryParams['path'] }).then(data => {
      console.log('loaded data for path', queryParams['path'], data)

      setDataFields(data)
    }).catch(err => {
      console.warn('caught err loading data for path', queryParams['path'], err)
    })

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
    getItems: ({ collectionsApiRoute, jekyll, match, setItems, setDefaultFields, setDataLoading, setCollectionName, setCollectionPath, branch }) => () => {
      const { collection } = match['params']

      if (collection && branch) {
        setDataLoading(true)

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
                  setDataLoading(false)
                })
              }).catch(resp => {
                setItems([])
                setDataLoading(false)
                notifier.bad(resp)
              })
          })
          .catch((resp) => {
            setItems([])
            setDataLoading(false)
            notifier.bad(resp)
          })
      }
    }
  }),
  withHandlers({
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
    createItem: ({ collectionsApiRoute, jekyll, branch, match, activeItem, updateCachedTree, items }) => (formData) => {
      const { collection } = match['params']

      if (collection && branch) {
        return jekyll.collection(collection, { ref: branch })
          .then(collection => {
            if (activeItem['name'] && activeItem['name'].split('.').length <= 1) {
              activeItem['name'] = `${activeItem['name']}.md`
            }

            if (items.find(item => item['name'] === activeItem['name'])) {
              return Promise.reject(new Error('Item already exists with this name'))
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
    duplicateItem: ({ items, jekyll, branch, match, activeItem, setActiveItem, getItems, setStagedFileUploads, setDataLoading, updateCachedTree, history, collectionsRoute }) => () => {
      setDataLoading(true)

      const { collection } = match['params']

      if (collection && branch) {
        return jekyll.collection(collection, { ref: branch })
          .then(collection => {
            const duplicatedItem = Object.assign({}, activeItem)

            do {
              const nameParts = duplicatedItem['name'].split('.')
              nameParts.pop()
              duplicatedItem['name'] = `${nameParts.join('.')}-copy.md`
            } while (items.find(item => item['name'] === duplicatedItem['name']))

            const message = `[HT] Duplicated item: ${activeItem.path}`

            updateCachedTree()

            return collection.createItem(duplicatedItem, { ref: branch, message }).then(item => {
              console.log('done duplicating item', item)
              setDataLoading(false)
              getItems()
              setStagedFileUploads([])
              setActiveItem(item)
              notifier.success('Item duplicated')
              history.push(`/${collectionsRoute}/${item['name']}?ref=${branch}`)
            }).catch(err => {
              notifier.bad(err)
              setDataLoading(false)
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
    handleFormSubmit: ({ isNewItem, collectionsRoute, items, branch, createItem, history, editItem, createFileUpload, getItems, match, setDataLoading, setStagedFileUploads, setDefaultFormData, setActiveItem }) => (formData) => {
      setDataLoading(true)
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
          setDataLoading(false)
          notifier.bad(resp)
        })
    },
    deleteItem: ({ collectionsApiRoute, branch, match, history, activeItem, getItems, updateCachedTree, setDataLoading }) => () => {
      setDataLoading(true)
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
  withEither(isDataLoadingConditionFn, Loading)
)(Data)
