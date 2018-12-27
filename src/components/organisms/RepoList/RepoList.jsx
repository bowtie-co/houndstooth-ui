import React from 'react'
import PropTypes from 'prop-types'
import { withMaybe } from '@bowtie/react-utils'
import { Row, Col, Title } from 'atoms'
import { RepoCard, Pagination } from 'molecules'

const nullConditionFn = ({ repoList }) => repoList.length <= 0

const RepoList = ({ repoList, pages, setPageNumber, pageNumber, reloadRepos }) => {
  return (
    <section>
      <div className='repo-list-header flex-row space-between'>
        <Title>Hello! Please select a repository.</Title>
        {/* <div>Search</div> */}
      </div>
      <Row>
        {
          repoList.map((repo, i) => <Col key={i} sm='auto'><RepoCard repo={repo} key={i} /></Col>)
        }
      </Row>
      <Pagination {...pages} handlePage={setPageNumber} pageNumber={pageNumber} />
    </section>

  )
}

RepoList.propTypes = {
  repoList: PropTypes.array
}

export default withMaybe(nullConditionFn)(RepoList)
