import React from 'react'
import PropTypes from 'prop-types'
import {
  Row
} from 'atoms'
import {
  Header,
  Footer
} from 'organisms'

const Users = (props) => {
  // const { users } = props
  return (
    <section>
      <Header {...props} />
      <Row>

        <Footer />
      </Row>
    </section>
  )
}

Users.propTypes = {
  isMainLoading: PropTypes.bool,
  setMainLoading: PropTypes.func
}

export default Users
