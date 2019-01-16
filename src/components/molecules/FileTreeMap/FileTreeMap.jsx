import React from 'react'
import qs from 'qs'
import {
  Icon,
  Link
} from 'atoms'

const FileTreeMap = ({ queryParams, tree, fileIcons, match, baseRoute, branch }) => {
  const recursiveMap = (treeObj = {}, path, pointerArr = []) => {
    const pathArr = path.split('/')
    const dir = pathArr.shift()
    const newPathArr = [...pointerArr, dir]
    const newTreeObj = typeof treeObj[newPathArr.join('/')] === 'object' ? treeObj[newPathArr.join('/')] : treeObj
    const dirList = Object.keys(newTreeObj).sort(a => a.type === 'file' ? 1 : -1)
    const newPathParams = Object.assign({}, queryParams, { path: newPathArr.join('/') })

    // variables for extention detection
    const nameArray = dir.split('.')
    const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
    const type = ext ? 'file' : 'dir'
    const iconClassName = fileIcons[ext] ? fileIcons[ext] : fileIcons[type]

    if (pathArr.length > 0) {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`/${baseRoute}/${match.params['type']}?${qs.stringify(newPathParams)}`}>
            <Icon className={iconClassName} color={'black'} size='sm' />{dir}
          </Link>
          {recursiveMap(newTreeObj, pathArr.join('/'), newPathArr)}
        </p>
      )
    } else if (match.params['type'] === 'dir') {
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`${match['url']}?${qs.stringify(newPathParams)}`}>
            <Icon className={iconClassName} color={'black'} size='sm' />{dir}
          </Link>
          <p className='nested-dir'>
            {
              dirList.map(filePath => {
                const filePathArr = filePath.split('/')
                const fileName = filePathArr[filePathArr.length - 1]
                const fileExtArr = fileName.split('.')
                const fileExt = fileExtArr.length > 1 ? fileExtArr[fileExtArr.length - 1] : null
                const fileType = fileExtArr.length > 1 ? 'file' : 'dir'
                return (
                  <p className='dir-list-file-tree'>
                    <Link to={{ pathname: `${fileType}`, search: `?path=${filePath}&ref=${branch}` }}>
                      <span className='nested-lines' />
                      <Icon className={fileIcons[fileExt] ? fileIcons[fileExt] : fileIcons[fileType]} color={'black'} size='sm' />{fileName}
                    </Link>
                  </p>
                )
              })
            }
          </p>
        </p>
      )
    } else {
      return (
        <p className='nested-dir'>
          {
            dirList.map(filePath => {
              const filePathArr = filePath.split('/')
              const fileName = filePathArr[filePathArr.length - 1]
              console.log('dirList fileName', fileName, filePath)

              const fileExtArr = fileName.split('.')
              const fileExt = fileExtArr.length > 1 ? fileExtArr[fileExtArr.length - 1] : null
              const fileType = fileExtArr.length > 1 ? 'file' : 'dir'
              return (
                <p className='dir-list-file-tree'>
                  <Link to={{ pathname: `${fileType}`, search: `?path=${filePath}&ref=${branch}` }}>
                    <span className='nested-lines' />
                    <Icon className={fileIcons[fileExt] ? fileIcons[fileExt] : fileIcons[fileType]} color={'black'} size='sm' />{fileName}
                  </Link>
                </p>
              )
            })
          }
        </p>
      )
    }
  }

  return (
    <div>
      {
        queryParams['path'] &&
          <div>
            <Link to={`/${baseRoute}/dir`}>
              <Icon iconName='folder' color={'black'} size='sm' /> ./
            </Link>
            {recursiveMap(tree, queryParams['path'])}
          </div>
      }
    </div>
  )
}

export default FileTreeMap
