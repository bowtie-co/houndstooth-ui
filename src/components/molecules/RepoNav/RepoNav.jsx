import React from 'react'
import PropTypes from 'prop-types'
import { BackButton, Row, Button } from 'atoms'
import { FieldContainer, CollectionEditorButton } from 'molecules'

const RepoNav = (props) => {
  const { branch, changeBranch, isCollectionable, isCommitable, asyncLoadModel } = props
  console.log('REPO NAV props', props)
  return (
    <Row className='space-between file-tree-navigation'>
      <BackButton> back </BackButton>
      <Button href={'commit'} disabled={!isCommitable}>Commit Changes</Button>
      <CollectionEditorButton isCollectionable={isCollectionable} />
      <FieldContainer
        async
        clearable={false}
        type={'select'}
        label={'Select a Branch'}
        value={branch}
        valueKey='name'
        labelKey='name'
        loadOptions={(search) => asyncLoadModel('branches', search)}
        onChange={changeBranch}
      />
    </Row>
  )
}

RepoNav.propTypes = {
  branch: PropTypes.string,
  changeBranch: PropTypes.func,
  isCollectionable: PropTypes.bool,
  isCommitable: PropTypes.bool
}

export default RepoNav
