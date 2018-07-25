import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'
import { RepoCard, Pagination } from 'molecules'

const RepoList = ({ repoList, pages, setPageNumber, pageNumber }) => {
  return (
    <section>
      <Pagination {...pages} handlePage={setPageNumber} pageNumber={pageNumber} />
      <Card>
        {
          repoList.map((repo, i) => <RepoCard repo={repo} key={i} />)
        }
      </Card>
    </section>

  )
}

RepoList.propTypes = {
  repoList: PropTypes.array
}

export default RepoList
