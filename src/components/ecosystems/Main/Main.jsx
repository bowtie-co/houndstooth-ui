import React from 'react'
import PropTypes from 'prop-types'
import {
  PrivateRoute,
  Switch,
  Body,
  Row
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
      <Row>
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
              path={'/repos/:username/:repo/:type?/:collection?'}
              component={Repo}
            />
          </Switch>
        </Body>
        <Footer />
      </Row>
    </section>
  )
}

Main.propTypes = {
  isMainLoading: PropTypes.bool,
  setMainLoading: PropTypes.func
}

export default Main
