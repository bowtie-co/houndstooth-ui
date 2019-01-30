import React from 'react'
import qs from 'qs'
import ChildDirListItem from './ChildDirListItem'
import {
  Icon,
  Link
} from 'atoms'

const FileTreeMap = ({ queryParams, tree, fileIcons, match, baseRoute, branch }) => {
  const recursiveMap = (treeObj = {}, path, pointerArr = []) => {
    // construct an array from path, and shift off the last item in array, which is the current directory we are handling
    const pathArr = path.split('/')
    const dir = pathArr.shift()

    // construct the new path to use link to
    const newPathArr = [...pointerArr, dir]
    const type = typeof treeObj[newPathArr.join('/')] === 'object' ? 'dir' : 'file'
    const newTreeObj = type === 'dir' ? treeObj[newPathArr.join('/')] : treeObj

    // sorted dirList. If the split array has more than one, we assume it's a file.
    const dirList = Object.keys(newTreeObj).sort(a => a.split('.').length > 1 ? 1 : -1)
    const newPathParams = Object.assign({}, queryParams, { path: newPathArr.join('/') })

    // variables for extention detection
    const nameArray = dir.split('.')
    const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
    const iconClassName = fileIcons[ext] ? fileIcons[ext] : fileIcons[type]

    if (pathArr.length > 0) {
      // If there are more nested items, then display link to current directory and recursively map remaining links.
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`/${baseRoute}/${type}?${qs.stringify(newPathParams)}`} className={'bold parent-link'}>
            <Icon className={iconClassName} color={'black'} size='sm' />{dir}
          </Link>
          {recursiveMap(newTreeObj, pathArr.join('/'), newPathArr)}
        </p>
      )
    } else if (type === 'dir') {
      // if this is the last item in the path AND it is a directory, then display the link and list out everything inside the directory as a .nested-dir
      return (
        <p className='nested-dir'>
          <span className='nested-lines' />
          <Link to={`${match['url']}?${qs.stringify(newPathParams)}`} className={'bold parent-link'}>
            <Icon className={iconClassName} color={'black'} size='sm' />{dir}
          </Link>
          <p className='nested-dir'>
            {
              dirList.map((filePath, i) => (
                <ChildDirListItem
                  key={i}
                  filePath={filePath}
                  queryParams={queryParams}
                  fileIcons={fileIcons}
                  branch={branch}
                />
              ))
            }
          </p>
        </p>
      )
    } else {
      // if the item is a file, then map through everything in the parent directory to display siblining files/dir.
      return (
        <p className='nested-dir'>
          {
            dirList.map((filePath, i) => (
              <ChildDirListItem
                key={i}
                filePath={filePath}
                queryParams={queryParams}
                fileIcons={fileIcons}
                branch={branch}
              />
            ))
          }
        </p>
      )
    }
  }

  return (
    <div className='file-tree-map-section'>
      {
        queryParams['path'] &&
          <div>
            <Link to={`/${baseRoute}/dir`} className={'bold parent-link'}>
              <Icon iconName='folder' color={'black'} size='sm' /> ./
            </Link>
            {recursiveMap(tree, queryParams['path'])}
          </div>
      }
    </div>
  )
}

export default FileTreeMap
