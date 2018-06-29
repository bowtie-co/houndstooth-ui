import React from 'react'
import { BackButton, Row } from '../../atoms'
import { FieldContainer } from '../../molecules'

const RepoNav = (props) => {
  const { branch, branchList, changeBranch } = props
  return (
    <Row className='space-between file-tree-navigation'>
      <BackButton> back </BackButton>
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
