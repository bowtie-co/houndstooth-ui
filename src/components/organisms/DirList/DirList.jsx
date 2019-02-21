import React from 'react'
import PropTypes from 'prop-types'
import FileBase64 from 'react-file-base64'

import { Row, Button, Icon, Col } from 'atoms'
import { DirCard } from 'molecules'

/** ********* base component **********/
const DirList = ({ dirList, handleDrop, handleClick, ...rest }) => {
  return (
    <Row style={{ 'position': 'relative' }}>
      {
        dirList.map((dir, i) => <DirCard dir={dir} key={i} {...rest} />)
      }
      <Col sm='12'>
        <div className='directory-file-upload'>
          <FileBase64
            multiple={false}
            onDone={handleClick}
          />
          <Button size='sm'><Icon iconName={'file-upload'} />Upload</Button>
        </div>
      </Col>
    </Row>
  )
}

export default DirList

DirList.propTypes = {
  dirList: PropTypes.array
}
