import React from 'react'
import qs from 'qs'
import {
  Icon,
  Link
} from 'atoms'

const FileTreeMap = ({ queryParams, dirList, fileIcons, match, baseRoute, branch }) => {
  const recursiveMap = (arr, path = []) => {
    const dir = arr.shift()
    const newPath = [...path, dir]
    const newPathParams = Object.assign({}, queryParams, { path: newPath.join('/') })
    const nameArray = dir.split('.')
    const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
    const type = ext ? 'file' : 'dir'
    const iconClassName = fileIcons[ext] ? fileIcons[ext] : fileIcons[type]

    if (arr.length > 0) {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`/${baseRoute}/${match.params['type']}?${qs.stringify(newPathParams)}`}>
            <Icon className={iconClassName} color={'black'} size='sm' />{dir}
          </Link>
          {recursiveMap(arr, newPath)}
        </p>
      )
    } else {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`${match['url']}?${qs.stringify(newPathParams)}`}>
            <Icon className={iconClassName} color={'black'} size='sm' />{dir}
          </Link>
          <p className='nested-dir'>
            {
              dirList.map(item => {
                const fileNameArr = item['name'].split('.')
                const fileExt = fileNameArr.length > 1 ? fileNameArr[fileNameArr.length - 1] : null
                // const newParams = Object.assign({}, queryParams, { path: item['path'] })
                return (
                  <p className='dir-list-file-tree'>
                    <Link to={{ pathname: `${item['type']}`, search: `?path=${item['path']}&ref=${branch}` }}>
                      <span className='nested-lines' />
                      <Icon className={fileIcons[fileExt] ? fileIcons[fileExt] : fileIcons[item['type']]} color={'black'} size='sm' />{item['name']}
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
            <Link to={`/${baseRoute}/dir`}>
              <Icon iconName='folder' color={'black'} size='sm' /> ./
            </Link>
            {recursiveMap(tree)}
          </div>
      }
    </div>
  )
}

export default FileTreeMap