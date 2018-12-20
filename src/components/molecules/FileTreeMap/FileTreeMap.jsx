import React from 'react'
import qs from 'qs'
import PropTypes from 'prop-types'
import {
  Icon,
  Link
} from 'atoms'

const FileTreeMap = ({ queryParams, dirList, fileIcons, baseRoute, match }) => {
  const recursiveMap = (arr) => {
    const path = arr.join('/')
    const newPathParams = Object.assign({}, queryParams, { path })
    const dir = arr.shift()
    const nameArray = dir.split('.')
    const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
    // console.log('fuck path', path);
    // console.log('fuck dir', dir);

    if (arr.length > 0) {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`/${baseRoute}/${match.params['type']}?${qs.stringify(newPathParams)}`}>
            <Icon className={fileIcons[ext] ? fileIcons[ext] : fileIcons['dir']} color={'black'} size='sm' />{dir}
          </Link>
          {recursiveMap(arr)}
        </p>
      )
    } else {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`${match['url']}?${qs.stringify(newPathParams)}`}>
            <Icon className={fileIcons[ext] ? fileIcons[ext] : fileIcons['dir']} color={'black'} size='sm' />{dir}
          </Link>
          <p className='nested-dir'>
            {
              dirList.map(item => {
                const fileNameArr = item['name'].split('.')
                const fileExt = fileNameArr.length > 1 ? fileNameArr[fileNameArr.length - 1] : null
                const newParams = Object.assign({}, queryParams, { path: item['path'] })
                console.log('====================================')
                console.log('newParams', newParams)
                console.log('====================================')
                return (
                  <p className='dir-list-file-tree'>
                    <Link to={`/${baseRoute}/${item['type']}?${qs.stringify(newParams)}`}>
                      <span className='nested-lines' />
                      <Icon className={fileIcons[fileExt] ? fileIcons[fileExt] : fileIcons['dir']} color={'black'} size='sm' />{item['name']}
                    </Link>
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
