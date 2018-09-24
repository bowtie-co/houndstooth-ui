import React from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import { Card, CardText, CardBody, CardFooter, FormGroup } from 'reactstrap'
import {
  Button
} from 'atoms'

// import Pagination from 'Pagination/Pagination'

const DocumentPreview = (props) => {
  const { value, edited, className = '', onTextLoaded, handleDocumentLoad, handleTextLoaded, pageNumber, previewScale, helper, label, previewOnly, togglePreview } = props

  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`}>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Card>
        <CardBody>
          <CardText>{label || 'Document Preview'}</CardText>
          <Document file={value} onLoadSuccess={handleDocumentLoad}>
            <Page scale={previewScale || 0.5} pageNumber={pageNumber} onGetTextSuccess={handleTextLoaded} />
          </Document>
          {/* <Pagination justify='center' {...props} /> */}
        </CardBody>
        <CardFooter className='text-center'>
          {onTextLoaded && <p className='x-small'>Preview pages to scan for quote information</p>}
          {!previewOnly && <Button className='btn-sm' color='primary' onClick={togglePreview}>Change</Button>}
        </CardFooter>
      </Card>
    </FormGroup>
  )
}

export default DocumentPreview
