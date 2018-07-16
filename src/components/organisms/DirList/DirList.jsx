import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '../../atoms'
import { DirCard } from '../../molecules'

const DirList = ({ dirList, branch }) => {
  console.log('dirList branch :', branch)
  return (
    <Card>
      {
        dirList.map((dir, i) => <DirCard dir={dir} key={i} branch={branch} />)
      }
    </Card>
  )
}

DirList.propTypes = {
  branch: PropTypes.string,
  dirList: PropTypes.array
}

export default DirList
