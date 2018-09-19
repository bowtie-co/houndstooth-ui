import React from 'react'
import { Redirect } from 'react-router-dom'
import { Switch, PublicRoute, PrivateRoute, Body, Col, Row } from 'atoms'
import { Main } from 'ecosystems'
import { Header, SideMenu, Footer } from 'organisms'
import { Welcome } from 'molecules'

const App = (props) => {
  return (
    <section className='app'>
      <Header />
      <Row>
        <Col id='side-menu-section' sm='2' style={{'padding-right': '0'}}>
          <SideMenu />
        </Col>
        <Col sm='auto'>
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
        </Col>
      </Row>
      <Footer />
    </section>
  )
}

export default App
