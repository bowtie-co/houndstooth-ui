import React from 'react'
import { BackButton, Row, Button } from '../../atoms'
import { FieldContainer, CollectionEditorButton } from '../../molecules'

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

export default RepoNav
