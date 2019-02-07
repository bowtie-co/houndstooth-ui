import React from 'react'
import {
  Icon,
  Link
} from 'atoms'

const DirectoryList = ({ dirList, branch, fileIcons, queryParams }) => (
  <p className='nested-dir'>
    {
      dirList.map((filePath, i) => {
        const filePathArr = filePath.split('/')
        const fileName = filePathArr[filePathArr.length - 1]
        const fileExtArr = fileName.split('.')
        const fileExt = fileExtArr.length > 1 ? fileExtArr[fileExtArr.length - 1] : null
        const fileType = fileExtArr.length > 1 ? 'file' : 'dir'
        return (
          <p className='dir-list-file-tree' key={i}>
            <Link to={{ pathname: `${fileType}`, search: `?path=${filePath}&ref=${branch}` }} className={filePath === queryParams['path'] ? 'active' : 'not-active'}>
              <span className='nested-lines' />
              <Icon className={fileIcons[fileExt] ? fileIcons[fileExt] : fileIcons[fileType]} color={'black'} size='sm' />{fileName}
            </Link>
          </p>
        )
      })
    }
  </p>
)

export default DirectoryList