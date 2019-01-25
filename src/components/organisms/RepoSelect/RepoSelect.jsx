import React from 'react'
import PropTypes from 'prop-types'
import {
  FieldContainer
} from 'molecules'

const RepoSelect = (props) => {
  const { baseRoute, loadingRepos, history, repoList } = props
  return (
    <FieldContainer
      // async
      className='repo-select'
      clearable={false}
      name='something'
      type={'select'}
      value={`${baseRoute}`}
      valueKey={'full_name'}
      labelKey='full_name'
      disabled={loadingRepos}
      options={repoList}
      onChange={(e) => {
        console.log('e', e)
        history.push({ pathname: `/${e.target.value}/collections`, search: `?ref=${e.target.default_branch || 'master'}` })
      }}
    />
  )
}

RepoSelect.propTypes = {
  stagedFiles: PropTypes.array,
  repo: PropTypes.object,
  message: PropTypes.string,
  setMessage: PropTypes.func,
  pushToGithub: PropTypes.func
}

export default RepoSelect
