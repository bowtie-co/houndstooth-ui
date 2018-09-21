import React from 'react'
import PropTypes from 'prop-types'
import {
  FieldContainer
} from 'molecules'

const RepoSelect = (props) => {
  const { match, asyncLoadRepos, history } = props
  const { repo, username } = match.params
  return (
    <FieldContainer
      async
      className='repo-select'
      clearable={false}
      name='something'
      type={'select'}
      value={`${username}/${repo}`}
      valueKey={'full_name'}
      labelKey='full_name'
      loadOptions={(search) => asyncLoadRepos(search)}
      onChange={(e) => {
        console.log('e', e)
        history.push({ pathname: `/repos/${e.target.value}/collections`, search: `?ref=${e.target.default_branch || 'master'}` })
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
