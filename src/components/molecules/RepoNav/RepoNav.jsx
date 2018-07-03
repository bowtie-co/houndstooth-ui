import React from 'react'
import { BackButton, Row, Button } from '../../atoms'
import { FieldContainer } from '../../molecules'

const RepoNav = (props) => {
  const { branch, branchList, changeBranch } = props
  return (
    <Row className='space-between file-tree-navigation'>
      <BackButton> back </BackButton>
      <Button href={'commit'}>Commit Changes</Button>
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
