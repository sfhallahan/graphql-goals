import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Router from 'next/router'

import { ME_QUERY } from '../../lib/graphql/queries'
import { SIGN_OUT_MUTATION } from '../../lib/graphql/mutations'
import styled from 'styled-components'

const TransparentButton = styled.button`
  height: 48px;
  padding: 0.5rem;
  font-size: 0.75rem;
  background-color: transparent;
  color: ${props => props.theme.text};
  font-weight: 300;
  outline: none;
  border: none;
  letter-spacing: 0.05rem;
  cursor: pointer;
`

class SignoutButton extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: ME_QUERY }]}
        awaitRefetchQueries={true}
      >
        {(signout, { loading, error }) => (
          <TransparentButton
            onClick={async e => {
              const message = await signout()
              console.log(message)
              Router.push('/auth')
            }}
          >
            SIGN OUT
          </TransparentButton>
        )}
      </Mutation>
    )
  }
}

export default SignoutButton
