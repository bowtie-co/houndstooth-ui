import React from 'react'
import PropTypes from 'prop-types'
import { withMaybe } from '@bowtie/react-utils'
import { Row, Col } from 'atoms'
import { RepoCard, Pagination } from 'molecules'

const nullConditionFn = ({ repoList }) => repoList.length <= 0

const RepoList = ({ repoList, pages, setPageNumber, pageNumber }) => {
  return (
    <section>
      <Pagination {...pages} handlePage={setPageNumber} pageNumber={pageNumber} />
      <Row>
        {
          repoList.map((repo, i) => <Col key={i} sm='4'><RepoCard repo={repo} key={i} /></Col>)
        }
      </Row>
    </section>

  )
}

RepoList.propTypes = {
  repoList: PropTypes.array
}

export default withMaybe(nullConditionFn)(RepoList)
