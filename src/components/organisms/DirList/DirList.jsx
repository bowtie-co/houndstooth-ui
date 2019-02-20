import React from 'react'
import PropTypes from 'prop-types'
import { withMaybe } from '@bowtie/react-utils'
import { Row } from 'atoms'
import { DirCard } from 'molecules'

/** ********* conditional fn **********/
const nullConditionFn = ({ dirList }) => dirList.length === 0

/** ********* base component **********/
const DirList = ({ dirList, ...rest }) => {
  return (
    <Row>
      {
        dirList.map((dir, i) => <DirCard dir={dir} key={i} {...rest} />)
      }
    </Row>
  )
}

export default withMaybe(nullConditionFn)(DirList)

DirList.propTypes = {
  dirList: PropTypes.array
}
