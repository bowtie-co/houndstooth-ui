
import React from 'react'
import { onlyUpdateForKeys } from 'recompose'
import classnames from 'classnames'
import {
  Icon,
  Link
} from 'atoms'

const DirectoryList = ({ dirList, branch, fileIcons, queryParams, stagedFiles }) => (
  <p className='nested-dir'>
    {
      dirList.map((filePath, i) => {
        const filePathArr = filePath.split('/')
        const fileName = filePathArr[filePathArr.length - 1]
        const fileExtArr = fileName.split('.')
        const fileExt = fileExtArr.length > 1 ? fileExtArr[fileExtArr.length - 1] : null
        const fileType = fileExtArr.length > 1 ? 'file' : 'dir'
        const isFileStaged = stagedFiles.some(file => file['path'] === filePath)
        return (
          <p className='dir-list-file-tree ' key={i}>
            <Link to={{ pathname: `${fileType}`, search: `?path=${filePath}&ref=${branch}` }} className={filePath === queryParams['path'] ? 'active' : 'not-active'}>
              <span className='nested-lines' />
              <span className={classnames({ 'staged-file-indictaor': isFileStaged })} />
              <p className='filename truncate'><Icon className={fileIcons[fileExt] ? fileIcons[fileExt] : fileIcons[fileType]} color={'black'} size='sm' />{fileName}</p>
            </Link>
          </p>
        )
      })
    }
  </p>
)

export default onlyUpdateForKeys(['dirList'])(DirectoryList)
