import React from 'react'
import PropTypes from 'prop-types'
import {
  Title,
  TH,
  THead,
  ExtLink,
  Icon
} from 'atoms'
import {
  Table
} from 'organisms'

const Users = (props) => {
  const { contributors, collaboratorIds, match, ...rest } = props
  const { repo } = match.params
  return (
    <section>
      <Title>Users</Title>
      <p>Registered users for {repo}</p>
      <Table {...rest} >
        <THead>
          <TH>Name</TH>
          <TH>Github</TH>
          <TH>Type</TH>
        </THead>
        <tbody>
          {
            contributors.length > 0
              ? contributors.map((u, i) => {
                const isCollaborator = collaboratorIds.includes(u['id'])
                return (
                  <tr>
                    <td>
                      {isCollaborator ? <Icon iconName={'user-edit'} /> : <Icon iconName={'user'} />}{u.login}
                    </td>
                    <td>
                      <ExtLink href={u.html_url}>{u.html_url}</ExtLink>
                    </td>
                    <td>
                      {isCollaborator ? 'Collaborator' : u.type}
                    </td>
                  </tr>
                )
              })
              : <tr>
                <td colspan='6'>There are no Users for this repo.</td>
              </tr>
          }
        </tbody>

      </Table>
    </section>
  )
}

Users.propTypes = {
  isMainLoading: PropTypes.bool,
  setMainLoading: PropTypes.func
}

export default Users
