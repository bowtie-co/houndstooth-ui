import React from 'react'
import {
  Repo,
  Notifications
} from 'ecosystems'
import {
  Switch,
  PrivateRoute,
  Body
} from 'atoms'

import {
  RepoList,
  SideMenu,
  Header,
  Footer
} from 'organisms'

const App = (props) => {
  return (
    <section className='app'>
      <Notifications />
      <Header {...props} />
      <div className='flex-row'>
        <SideMenu {...props} />
        <Body>
          <Switch>
            <PrivateRoute
              exact
              props={props}
              path='/'
              component={RepoList}
            />
            <PrivateRoute
              props={props}
              // KEEP TYPE FOR delegating to FileEditor vs CollectionEditor
              // Can we infer the :type from the file response?
              // path='/:username/:repo/:action(commit|browse|collections)?' // handle collection in query params
              path='/:username/:repo/:type?/:collection?/:item?' // handle collection in query params
              component={Repo}
            />
          </Switch>
        </Body>
      </div>
      <Footer />
    </section>
  )
}

export default App
