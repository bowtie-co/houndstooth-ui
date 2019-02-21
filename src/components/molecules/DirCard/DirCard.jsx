import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import {
  Subtitle,
  Icon
} from 'atoms'
import { lists } from 'helpers'

const DirCard = ({ dir, branch, handleDrop, setEnterZone, inDropZone }) => {
  const { fileIcons } = lists
  const { type, path, name } = dir
  const nameArray = name.split('.')
  const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
  return (
    <Link
      to={{ pathname: `${type}`, search: `?path=${path}&ref=${branch}` }}
      className='repoDir'
      style={{ 'position': type === 'dir' ? 'relative' : 'unset' }}
    >
      {
        inDropZone &&
          <span className={classnames({ inFileDropZone: inDropZone && type !== 'dir', inDirDropZone: inDropZone && type === 'dir' }, 'flex-col flex-center')}>
            <Subtitle>ADD FILE</Subtitle>
          </span>
      }
      <Dropzone
        className={'p-5 flex-col flex-center'}
        disableClick
        onClick={evt => evt.preventDefault()}
        onDrop={handleDrop}
        onDragEnter={() => setEnterZone(true)}
        onDragLeave={() => setEnterZone(false)}
      >
        <div className={classnames({ opaqueBg: inDropZone }, 'flex-col flex-center')}>
          <Icon className={fileIcons[ext] ? fileIcons[ext] : fileIcons[type]} color={inDropZone ? '#1e1f2047' : 'black'} size='md' />
          <Subtitle title={name} />
        </div>
      </Dropzone>
    </Link>

  )
}

DirCard.propTypes = {
  branch: PropTypes.string,
  dir: PropTypes.object
}

export default DirCard
