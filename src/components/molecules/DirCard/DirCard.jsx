import React from 'react'
import { Link } from 'react-router-dom'
import {
  Subtitle
} from 'atoms'

const DirCard = ({ dir, branch }) => {
  console.log('DirCard branch :', branch)

  const supportedIcons = ['css', 'html', 'js', 'json']

  const { type, path, name } = dir
  const nameArray = name.split('.')
  const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
  return (
    <Link
      to={{ pathname: `${type}`, search: `?path=${path}&ref=${branch}` }}
      className='repoDir'>
      <img className='fileIcon' src={require(`images/${supportedIcons.includes(ext) ? ext : type}.svg`)} alt='' />
      <Subtitle title={name} />
    </Link>
  )
}

export default DirCard
