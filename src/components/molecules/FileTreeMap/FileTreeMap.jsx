import React from 'react'
import PropTypes from 'prop-types'
import {
  Icon
} from 'atoms'

const FileTreeMap = ({ queryParams, dirList, fileIcons }) => {
  const recursiveMap = (arr) => {
    const dir = arr.shift()
    const nameArray = dir.split('.')
    const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
    if (arr.length > 0) {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Icon className={fileIcons[ext] ? fileIcons[ext] : fileIcons['dir']} color={'black'} size='sm' />{dir}
          {recursiveMap(arr)}
        </p>
      )
    } else {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Icon className={fileIcons[ext] ? fileIcons[ext] : fileIcons['dir']} color={'black'} size='sm' />{dir}
          <p className='nested-dir'>
            {
              dirList.map(item => {
                const fileNameArr = item['name'].split('.')
                const fileExt = fileNameArr.length > 1 ? fileNameArr[fileNameArr.length - 1] : null
                return (
                  <p className='dir-list-file-tree'>
                    <span className='nested-lines' />
                    <Icon className={fileIcons[fileExt] ? fileIcons[fileExt] : fileIcons['dir']} color={'black'} size='sm' />{item['name']}
                  </p>
                )
              })
            }
          </p>
        </p>
      )
    }
  }

  const tree = queryParams['path'] ? queryParams['path'].split('/') : []

  return (
    <div>
      {
        tree.length > 0 &&
          <div>
            <Icon iconName='folder' color={'black'} size='sm' /> ./
            {recursiveMap(tree)}
          </div>
      }
    </div>
  )
}

FileTreeMap.propTypes = {
  repo: PropTypes.object
}

export default FileTreeMap
