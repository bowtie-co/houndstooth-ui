import React from 'react'
import PropTypes from 'prop-types'
import {
  BackButton,
  Row,
  Button
} from '../../atoms'
import {
  FieldContainer,
  CollectionEditorButton
} from '../../molecules'

const RepoNav = (props) => {
  const { branch, branchList, changeBranch, isCollectionable, isCommitable } = props
  return (
    <Row className='space-between file-tree-navigation'>
      <BackButton> back </BackButton>
      <Button href={'commit'} disabled={!isCommitable}>Commit Changes</Button>
      <CollectionEditorButton isCollectionable={isCollectionable} />
      <FieldContainer
        type={'select'}
        label={'Select a Branch'}
        value={branch}
        options={branchList.map(branch => branch.name)}
        onChange={changeBranch}
      />
    </Row>
  )
}

RepoNav.propTypes = {
  branch: PropTypes.string,
  branchList: PropTypes.array,
  changeBranch: PropTypes.func,
  isCollectionable: PropTypes.bool,
  isCommitable: PropTypes.bool
}

export default RepoNav
