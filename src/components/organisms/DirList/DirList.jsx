import React from 'react'
import { Card } from '../../atoms'
import { DirCard } from '../../molecules'

const DirList = ({ dirList }) => {
  console.log('this is dirlist')
  return (
    <Card>
      {
        dirList.map((dir, i) => <DirCard dir={dir} key={i} />)
      }
    </Card>
  )
}

export default DirList
