import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import gql from 'graphql-tag'
import { ME_QUERY } from '../../lib/graphql/queries'
import { LOGIN_MUTATION } from '../../lib/graphql/mutations'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
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
          <div>
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault()
                const res = await signin()
                console.log(res)
                this.setState({ email: '', password: '' })
                Router.push('/')
              }}
            >
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.saveToState}
              />
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Login
