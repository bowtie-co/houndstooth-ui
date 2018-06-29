import React from 'react'
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

export default DirList
