import React from 'react'
import {
  Button
} from '../../atoms'

const EditModelButton = ({ label, modelName, modelId }) => {
  return (
    <Button label={`Edit ${modelName}`} href={`/edit/${modelName}/${modelId}`} />
  )
}

export default EditModelButton
