import React from 'react'
import { Redirect } from 'react-router-dom'
import { Main } from 'ecosystems'
import { Header, SideMenu, Footer } from 'organisms'
import { Welcome } from 'molecules'
import {
  Switch,
  PublicRoute,
  PrivateRoute,
  Body,
  Row,
  Container
} from 'atoms'

const App = (props) => {
  return (
    <section className='app'>
      <Container fluid>
        <Header />
        <Row>
          <SideMenu />
          <Body>
            <Switch>
              <PublicRoute
                props={props}
                path='/welcome'
                component={Welcome}
              />
              <PrivateRoute
                props={props}
                path='/:model(repos)/:username?/:repo?'
                component={Main}
              />
              <PublicRoute
                props={{ to: '/welcome' }}
                path='/'
                component={Redirect}
              />
            </Switch>
          </Body>
        </Row>
      </Container>
      <Footer />
    </section>
  )
}

export default App
