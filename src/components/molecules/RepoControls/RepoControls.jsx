import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Button,
  Col,
  Icon
} from 'atoms'
import {
  FieldContainer,
  CollectionEditorButton
} from 'molecules'

const RepoControls = (props) => {
  const { branch, changeBranch, isCommitable, asyncLoadModel, stagedFiles, match, branchList, ...rest } = props
  const { type } = match.params
  console.log('REPO NAV props', props)
  return (
    <Row className='space-between file-tree-navigation'>
      {/* <BackButton> back </BackButton> */}
      <Col>
        <div className='flex-row align-center'>
          <div className='bold' style={{ marginRight: '21px' }}>
            <Icon iconName='code-branch' />
            Select a Branch:
          </div>
          <FieldContainer
            horizontal
            disabled={stagedFiles.length > 0}
            clearable={false}
            type={'select'}
            value={{ name: branch }}
            valueKey='name'
            labelKey='name'
            options={branchList}
            onChange={changeBranch}
          />
        </div>
      </Col>
      <Col className='justify-content-end flex'>
        {
          type !== 'collections' &&
          <Button href={'commit'} disabled={!isCommitable}>Commit Changes</Button>
        }
        <CollectionEditorButton {...rest} />
      </Col>

    </Row>
  )
}

RepoControls.propTypes = {
  branch: PropTypes.string,
  changeBranch: PropTypes.func,
  isCollectionable: PropTypes.bool,
  isCommitable: PropTypes.bool
}

export default RepoControls
