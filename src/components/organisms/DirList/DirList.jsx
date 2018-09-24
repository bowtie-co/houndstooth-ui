import React from 'react'
import PropTypes from 'prop-types'
import { withMaybe } from '@bowtie/react-utils'
import { Row } from 'atoms'
import { DirCard } from 'molecules'

/** ********* conditional fn **********/
const nullConditionFn = ({ dirList }) => dirList.length === 0

/** ********* base component **********/
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

export default withMaybe(nullConditionFn)(DirList)

DirList.propTypes = {
  branch: PropTypes.string,
  dirList: PropTypes.array
}
