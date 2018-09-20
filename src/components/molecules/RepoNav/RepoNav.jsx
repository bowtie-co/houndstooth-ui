import React from 'react'
import PropTypes from 'prop-types'
import { Row, Button, Col } from 'atoms'
import { FieldContainer } from 'molecules'

const RepoNav = (props) => {
  const { branch, changeBranch, isCommitable, asyncLoadModel } = props
  console.log('REPO NAV props', props)
  return (
    <Row className='space-between file-tree-navigation'>
      {/* <BackButton> back </BackButton> */}
      <Col>
        <FieldContainer
          async
          horizontal
          clearable={false}
          type={'select'}
          label={'Select a Branch'}
          value={branch}
          valueKey='name'
          labelKey='name'
          loadOptions={(search) => asyncLoadModel('branches', search)}
          onChange={changeBranch}
        />
      </Col>
      <Col className='justify-content-end'>
        <Button href={'commit'} disabled={!isCommitable}>Commit Changes</Button>
      </Col>
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
