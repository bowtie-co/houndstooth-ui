import React from 'react'
import PropTypes from 'prop-types'
import {
  PrivateRoute,
  Switch,
  Body
} from 'atoms'
import {
  RepoList,
  SideMenu,
  Header,
  Footer
} from 'organisms'
import { Repo } from '..'

const Main = (props) => {
  const { isMainLoading, setMainLoading, repoList, pages, setPageNumber, pageNumber, reloadRepos, ...rest } = props
  return (
    <section>
      <Header {...props} />
      <div className='flex-row'>
        <SideMenu {...props} />
        <Body>
          <Switch>
            <PrivateRoute
              exact
              props={{ repoList, pages, setPageNumber, pageNumber, reloadRepos }}
              path={'/repos'}
              component={RepoList}
            />
            <PrivateRoute
              props={rest}
              path={'/repos/:username/:repo/:type?/:collection?/:item?'}
              component={Repo}
            />
          </Switch>
        </Body>
      </div>
      <Footer />
    </section>
  )
}

Main.propTypes = {
  isMainLoading: PropTypes.bool,
  setMainLoading: PropTypes.func
}

export default Main
