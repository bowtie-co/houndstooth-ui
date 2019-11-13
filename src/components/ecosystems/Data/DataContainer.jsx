
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
    activeData: null,
    dataFields: null,
    defaultFields: {},
    activeItem: {},
    isDataLoading: false,
    fileUploads: {},
    stagedFileUploads: [],
    defaultFormData: null
  }, {
    setItems: ({ items }) => (payload) => ({ items: payload }),
    setActiveData: ({ activeData }) => (payload) => ({ activeData: payload }),
    setDataFields: ({ dataFields }) => (payload) => ({ dataFields: payload }),
    setDefaultFields: ({ defaultFields }) => (payload) => ({ defaultFields: payload }),
    setActiveItem: ({ activeItem }) => (payload) => ({ activeItem: payload }),
    setDataLoading: ({ isDataLoading }) => (payload) => ({ isDataLoading: payload }),
    setFileUploads: ({ fileUploads }) => (payload) => ({ fileUploads: payload }),
    setStagedFileUploads: ({ stagedFileUploads }) => (payload) => ({ stagedFileUploads: payload }),
    setDefaultFormData: ({ defaultFormData }) => (payload) => ({ defaultFormData: payload })
  }),
  withPropsOnChange(['match', 'queryParams'], ({ buildSdkParams, queryParams, setActiveData }) => {
    const params = buildSdkParams()
    const jekyll = github.jekyll(params)

    jekyll.data({ path: queryParams['path'] }).then(data => {
      console.log('loaded data for path', queryParams['path'], data)

      setActiveData(data)
    }).catch(err => {
      console.warn('caught err loading data for path', queryParams['path'], err)
    })

    return {
      jekyll
    }
  }),
  withHandlers({
    handleFormSubmit: ({ jekyll, queryParams, setDataLoading, activeData }) => (formData) => {
      setDataLoading(true)

      console.log('submitting data form with ', formData)

      const { file } = activeData
      const { sha } = file
      const { path } = queryParams

      const message = `[HT] Update Data: ${file['path']}`

      jekyll.saveData({ data: formData, sha, path, message }).then(resp => {
        notifier.success('Data saved')
        setDataLoading(false)
      }).catch(err => {
        notifier.bad(err)
        setDataLoading(false)
      })
    }
  }),
  withMaybe(nullConditionFn),
  withEither(emptyStateConditionFn, EmptyState),
  withEither(emptyItemConditionFn, EmptyItem),
  withEither(isDataLoadingConditionFn, Loading)
)(Data)
