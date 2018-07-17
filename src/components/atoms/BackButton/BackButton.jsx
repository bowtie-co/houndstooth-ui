import React from 'react'
import { Button } from '..'
import { withRouter } from 'react-router'

const BackButton = ({ children, history, ...rest }) => <Button onClick={() => history.goBack()} {...rest}> {children} </Button>

export default withRouter(BackButton)
