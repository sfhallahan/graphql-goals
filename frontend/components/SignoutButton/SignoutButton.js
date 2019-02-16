import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Router from 'next/router'

import { ME_QUERY } from '../../lib/graphql/queries'
import { SIGN_OUT_MUTATION } from '../../lib/graphql/mutations'

class SignoutButton extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: ME_QUERY }]}
        awaitRefetchQueries={true}
      >
        {(signout, { loading, error }) => (
          <button
            onClick={async e => {
              const message = await signout()
              console.log(message)
              Router.push('/auth')
            }}
          >
            Sign out
          </button>
        )}
      </Mutation>
    )
  }
}

export default SignoutButton
