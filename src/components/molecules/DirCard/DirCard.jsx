import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import { Link } from 'react-router-dom'
import {
  Subtitle,
  Icon
} from 'atoms'

const DirCard = ({ dir, branch, handleDrop }) => {
  const fileIcons = {
    css: 'fab fa-css3',
    scss: 'fab fa-sass',
    html: 'fas fa-code',
    js: 'fab fa-js',
    json: 'far fa-file-alt',
    file: 'far fa-file-alt',
    dir: 'fas fa-folder'
  }
  const { type, path, name } = dir
  const nameArray = name.split('.')
  const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
  return (
    <Link
      to={{ pathname: `${type}`, search: `?path=${path}&ref=${branch}` }}
      className='repoDir'
    >
      <Dropzone
        className='flex-col flex-center'
        disableClick
        onClick={evt => evt.preventDefault()}
        onDrop={handleDrop}
      >
        <Icon className={fileIcons[ext] ? fileIcons[ext] : fileIcons[type]} color={'black'} size='md' />
        <Subtitle title={name} />
      </Dropzone>
    </Link>

  )
}

DirCard.propTypes = {
  branch: PropTypes.string,
  dir: PropTypes.object
}

export default DirCard
