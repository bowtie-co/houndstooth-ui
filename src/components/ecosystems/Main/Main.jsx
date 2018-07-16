import React from 'react'
import PropTypes from 'prop-types'
import {
  PrivateRoute,
  Switch
} from '../../atoms'
import { RepoList } from '../../organisms'
import { Repo } from '..'

const Main = (props) => {
  const { isMainLoading, setMainLoading, ...rest } = props
  return (
    <div className='demo-template'>
      <Switch>
        <PrivateRoute
          exact
          props={rest}
          path={'/repos'}
          component={RepoList}
        />
        <PrivateRoute
          props={rest}
          path={'/repos/:username/:repo'}
          component={Repo}
        />

      </Switch>
    </div>
  )
}

Main.propTypes = {
  isMainLoading: PropTypes.bool,
  setMainLoading: PropTypes.func,
  selectItem: PropTypes.func.isRequired
}

export default Main
