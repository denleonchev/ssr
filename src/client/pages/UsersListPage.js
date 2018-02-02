import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUsers } from '../actions'

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  renderUsers() {
    return this.props.users.map(user => {
      return (
        <li key={user.id}>{user.name}</li>
      )
    })
  }

  render() {
    return (
      <div>
        Here is a big list of users
        {this.renderUsers()}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return { users: state.users }
}

function loadData(store) {
  console.log('I am trying to load some data')
  return store.dispatch(fetchUsers())
}

export default {
  loadData,
  component: connect(mapStatetoProps, { fetchUsers })(UsersListPage)
}