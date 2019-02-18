import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Router from 'next/router'

import Login from './Login'
import { ME_QUERY } from '../../lib/graphql/queries'
import { LOGIN_MUTATION } from '../../lib/graphql/mutations'

class LoginContainer extends Component {
  state = {
    email: '',
    password: ''
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = signin => async e => {
    e.preventDefault()
    const res = await signin()
    console.log(res)
    this.setState({ email: '', password: '' })
    Router.push('/')
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: ME_QUERY }]}
        awaitRefetchQueries={true}
      >
        {(signin, { loading, error }) => (
          <Login
            onSubmit={this.handleSubmit(signin)}
            onInputChange={this.saveToState}
            email={this.state.email}
            password={this.state.password}
            loading={loading}
          />
        )}
      </Mutation>
    )
  }
}

export default LoginContainer
