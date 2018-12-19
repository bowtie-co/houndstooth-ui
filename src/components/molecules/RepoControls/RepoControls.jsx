import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Button,
  Col,
  Icon
} from 'atoms'
import { FieldContainer } from 'molecules'

const RepoControls = (props) => {
  const { branch, changeBranch, isCommitable, asyncLoadModel, stagedFiles, match } = props
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
            async
            horizontal
            disabled={stagedFiles.length > 0}
            clearable={false}
            type={'select'}
            value={branch}
            valueKey='name'
            labelKey='name'
            loadOptions={(search) => asyncLoadModel('branches', search)}
            onChange={changeBranch}
          />
        </div>
      </Col>
      {
        type !== 'collections' &&
          <Col className='justify-content-end'>
            <Button href={'commit'} disabled={!isCommitable}>Commit Changes</Button>
          </Col>
      }
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
