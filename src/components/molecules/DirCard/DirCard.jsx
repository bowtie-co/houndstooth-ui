import React from 'react'
import { Link } from 'react-router-dom'
import {
  Subtitle
} from '../../atoms'

const DirCard = ({ dir }) => {
  const supportedIcons = ['css', 'html', 'js', 'json', 'folder']

  const { type, path, name } = dir
  const nameArray = name.split('.')
  const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : 'folder'
  return (
    <Link
      to={{ pathname: `${type}`, search: `?path=${path}` }}
      className='repoDir'>
      <img className='fileIcon' src={require(`../../../images/${supportedIcons.includes(ext) ? ext : 'file'}.svg`)} alt='' />
      <Subtitle title={name} />
    </Link>
  )
}

export default DirCard
