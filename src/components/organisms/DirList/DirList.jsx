import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'atoms'
import { DirCard } from 'molecules'

const DirList = ({ dirList, branch }) => {
  console.log('dirList branch :', branch)
  return (
    <Row>
      {
        dirList.map((dir, i) => <DirCard dir={dir} key={i} branch={branch} />)
      }
    </Row>
  )
}

DirList.propTypes = {
  branch: PropTypes.string,
  dirList: PropTypes.array
}

export default DirList
