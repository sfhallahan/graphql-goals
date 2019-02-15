import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/client/withData'

import gql from 'graphql-tag'
import Router from 'next/router'

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      email
    }
  }
`

const checkIsSignedIn = async client => {
  try {
    const { data = {} } = await client.query({
      query: ME_QUERY
    })
    console.log(data)
    return data.me && data.me.id
  } catch (e) {
    console.log(e)
    return false
  }
}

const redirect = ({ res, path }) => {
  if (typeof window === 'undefined') {
    res.writeHead(302, {
      Location: `http://localhost:3000${path}`
    })
    res.end()
    return
  }
  Router.push(`${path}`)
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { res, apolloClient } = ctx
    const isSignedIn = await checkIsSignedIn(apolloClient)
    // protected route && not signed in
    if (!Component.unprotected && !isSignedIn) {
      redirect({ res, path: '/auth' })
    }
    // unprotected route && signed in
    else if (Component.unprotected && isSignedIn) {
      redirect({ res, path: '/' })
    }

    return {}
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
