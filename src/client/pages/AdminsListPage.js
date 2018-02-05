import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchAdmins } from '../actions'

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins()
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return (
        <li key={admin.id}>{admin.name}</li>
      )
    })
  }

  render() {
    return (
      <div>
        Here is a big list of admins
        {this.renderAdmins()}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return { admins: state.admins }
}

function loadData(store) {
  console.log('I am trying to load some data')
  return store.dispatch(fetchAdmins())
}

export default {
  loadData,
  component: connect(mapStatetoProps, { fetchAdmins })(AdminsListPage)
}