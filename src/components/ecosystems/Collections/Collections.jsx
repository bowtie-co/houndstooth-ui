
import React from 'react'
import { Button, Col } from '../../atoms'
import { RepoNav } from '../../molecules'

const Collections = (props) => {
  const { collections, branch, branchList, changeBranch, stagedFiles } = props
  return (
    <Col>
      <RepoNav
        branch={branch}
        branchList={branchList}
        changeBranch={changeBranch}
        isCollectionable={collections.length > 0}
        isCommitable={stagedFiles.length > 0}
      />
     These are your collections:
      {
        collections.map((col, i) => {
          return (
            <Button
              href={`${col}`}
              key={i}>
              {col}
            </Button>
          )
        })
      }
    </Col>
  )
}

export default Collections
