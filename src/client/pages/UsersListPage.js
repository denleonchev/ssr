import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

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

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users`}</title>
      </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.head()}
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
  return store.dispatch(fetchUsers())
}

export default {
  loadData,
  component: connect(mapStatetoProps, { fetchUsers })(UsersListPage)
}